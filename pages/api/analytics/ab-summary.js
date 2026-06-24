import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';
import {
  EVENT_SUMMARY_FIELDS,
  buildCreatedAtCondition,
  eventsByExperimentKeyQuery,
  parseDateInput,
} from '../../../libs/abAnalyticsQueries';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const experimentKeyQuery = eventsByExperimentKeyQuery(EVENT_SUMMARY_FIELDS);

const MAX_RUNTIME_MS = 8000;
const PAGE_SIZE = 1000;

function emptyVariantBucket() {
  return {
    exposure: 0,
    pageViews: 0,
    purchaseIntent: 0,
    purchaseComplete: 0,
    totalEvents: 0,
  };
}

function accumulate(items, acc) {
  const { byVariant, attributionBySession, byVariantChannel, sessionsByVariant } = acc;

  for (const item of items) {
    const variant = item.variant || 'UNASSIGNED';
    if (!byVariant[variant]) byVariant[variant] = emptyVariantBucket();

    byVariant[variant].totalEvents += 1;
    if (item.eventName === 'ab_exposure') byVariant[variant].exposure += 1;
    if (item.eventName === 'ab_page_view') byVariant[variant].pageViews += 1;
    if (item.eventName === 'ab_purchase_intent') byVariant[variant].purchaseIntent += 1;
    if (item.eventName === 'ab_purchase_complete') byVariant[variant].purchaseComplete += 1;

    const sessionKey = item.sessionId || null;
    if (sessionKey) {
      if (!sessionsByVariant[variant]) sessionsByVariant[variant] = new Set();
      sessionsByVariant[variant].add(sessionKey);
    }
    if (sessionKey && !attributionBySession.has(sessionKey)) {
      attributionBySession.set(sessionKey, {
        channel: item.acquisitionChannel || 'unknown',
        source: item.acquisitionSource || '(direct)',
        medium: item.acquisitionMedium || '(none)',
        campaign: item.acquisitionCampaign || '(none)',
      });
    }

    const channel = item.acquisitionChannel || 'unknown';
    if (!byVariantChannel[variant]) byVariantChannel[variant] = {};
    if (!byVariantChannel[variant][channel]) {
      byVariantChannel[variant][channel] = {
        exposure: 0,
        purchaseIntent: 0,
        purchaseComplete: 0,
        totalEvents: 0,
      };
    }
    const bucket = byVariantChannel[variant][channel];
    bucket.totalEvents += 1;
    if (item.eventName === 'ab_exposure') bucket.exposure += 1;
    if (item.eventName === 'ab_purchase_intent') bucket.purchaseIntent += 1;
    if (item.eventName === 'ab_purchase_complete') bucket.purchaseComplete += 1;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const experimentKey =
    typeof req.query.experimentKey === 'string' && req.query.experimentKey.trim()
      ? req.query.experimentKey.trim()
      : 'home_v1';
  const from = parseDateInput(req.query.from);
  const to = parseDateInput(req.query.to);
  const createdAt = buildCreatedAtCondition(from, to);

  const acc = {
    byVariant: {},
    attributionBySession: new Map(),
    byVariantChannel: {},
    sessionsByVariant: {},
  };

  const startedAt = Date.now();
  let truncatedByRuntime = false;
  let totalEvents = 0;
  const usedFallback = false;

  async function runExperimentKeyScan() {
    let nextToken = null;
    do {
      const result = await API.graphql({
        query: experimentKeyQuery,
        variables: {
          experimentKey,
          createdAt,
          sortDirection: 'ASC',
          limit: PAGE_SIZE,
          nextToken,
        },
      });
      const data = result?.data?.abTestEventsByExperimentKeyAndCreatedAt;
      const page = data?.items || [];
      totalEvents += page.length;
      accumulate(page, acc);
      nextToken = data?.nextToken || null;
      if (Date.now() - startedAt >= MAX_RUNTIME_MS) {
        truncatedByRuntime = true;
        break;
      }
    } while (nextToken);
  }

  try {
    // Query the experimentKey GSI with a createdAt range. This is a single
    // indexed Query (not a table scan) and, unlike the experimentDay fan-out,
    // it includes pre-cutover rows that have a null experimentDay - so the
    // dashboard populates for all historical and new data alike.
    await runExperimentKeyScan();
    return res.status(200).json(buildResponse());
  } catch (error) {
    console.error('Failed to build AB summary:', error);
    return res.status(500).json({ error: 'Failed to build AB summary' });
  }

  function buildResponse() {
    const byChannel = {};
    const bySourceMedium = {};
    const byCampaign = {};

    for (const attr of acc.attributionBySession.values()) {
      const channel = attr.channel || 'unknown';
      const sourceMedium = `${attr.source || '(direct)'} / ${attr.medium || '(none)'}`;
      const campaign = attr.campaign || '(none)';
      byChannel[channel] = (byChannel[channel] || 0) + 1;
      bySourceMedium[sourceMedium] = (bySourceMedium[sourceMedium] || 0) + 1;
      byCampaign[campaign] = (byCampaign[campaign] || 0) + 1;
    }

    // Fold per-variant unique session counts into the variant buckets.
    const byVariant = acc.byVariant;
    Object.entries(acc.sessionsByVariant).forEach(([variant, sessions]) => {
      if (!byVariant[variant]) byVariant[variant] = emptyVariantBucket();
      byVariant[variant].sessions = sessions.size;
    });

    return {
      experimentKey,
      from,
      to,
      truncated: truncatedByRuntime,
      truncatedByRuntime,
      usedFallback,
      totalEvents,
      byVariant,
      acquisition: {
        attributedSessions: acc.attributionBySession.size,
        byChannel,
        bySourceMedium,
        byCampaign,
        byVariantChannel: acc.byVariantChannel,
      },
    };
  }
}
