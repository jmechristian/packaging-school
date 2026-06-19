import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const listAbEventsQuery = /* GraphQL */ `
  query ListAbEventsForSummary(
    $filter: ModelAbTestEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAbTestEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        eventName
        variant
        sessionId
        acquisitionChannel
        acquisitionSource
        acquisitionMedium
        acquisitionCampaign
        createdAt
      }
      nextToken
    }
  }
`;

function parseDateInput(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function parseBoundedInt(value, fallback, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  const rounded = Math.floor(parsed);
  return Math.min(max, Math.max(min, rounded));
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
  const maxScan = parseBoundedInt(req.query.maxScan, 20000, 1000, 100000);
  const filter = {
    experimentKey: { eq: experimentKey },
    ...(from || to
      ? {
          createdAt: {
            ...(from ? { ge: from } : {}),
            ...(to ? { le: to } : {}),
          },
        }
      : {}),
  };

  try {
    let nextToken = null;
    let items = [];

    do {
      const result = await API.graphql({
        query: listAbEventsQuery,
        variables: {
          filter,
          limit: 1000,
          nextToken,
        },
      });

      const page = result?.data?.listAbTestEvents?.items || [];
      items = items.concat(page);
      nextToken = result?.data?.listAbTestEvents?.nextToken || null;
    } while (nextToken && items.length < maxScan);

    const byVariant = {};
    const attributionBySession = new Map();

    for (const item of items) {
      const variant = item.variant || 'UNASSIGNED';
      if (!byVariant[variant]) {
        byVariant[variant] = {
          exposure: 0,
          pageViews: 0,
          purchaseIntent: 0,
          purchaseComplete: 0,
          totalEvents: 0,
        };
      }

      byVariant[variant].totalEvents += 1;
      if (item.eventName === 'ab_exposure') byVariant[variant].exposure += 1;
      if (item.eventName === 'ab_page_view') byVariant[variant].pageViews += 1;
      if (item.eventName === 'ab_purchase_intent')
        byVariant[variant].purchaseIntent += 1;
      if (item.eventName === 'ab_purchase_complete')
        byVariant[variant].purchaseComplete += 1;

      const sessionKey = item.sessionId || null;
      if (sessionKey && !attributionBySession.has(sessionKey)) {
        attributionBySession.set(sessionKey, {
          channel: item.acquisitionChannel || 'unknown',
          source: item.acquisitionSource || '(direct)',
          medium: item.acquisitionMedium || '(none)',
          campaign: item.acquisitionCampaign || '(none)',
        });
      }
    }

    const byChannel = {};
    const bySourceMedium = {};
    const byCampaign = {};
    const byVariantChannel = {};

    for (const attr of attributionBySession.values()) {
      const channel = attr.channel || 'unknown';
      const sourceMedium = `${attr.source || '(direct)'} / ${attr.medium || '(none)'}`;
      const campaign = attr.campaign || '(none)';

      byChannel[channel] = (byChannel[channel] || 0) + 1;
      bySourceMedium[sourceMedium] = (bySourceMedium[sourceMedium] || 0) + 1;
      byCampaign[campaign] = (byCampaign[campaign] || 0) + 1;
    }

    for (const item of items) {
      const variant = item.variant || 'UNASSIGNED';
      const sessionAttr = item.sessionId ? attributionBySession.get(item.sessionId) : null;
      const channel = sessionAttr?.channel || item.acquisitionChannel || 'unknown';

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

    return res.status(200).json({
      experimentKey,
      from,
      to,
      maxScan,
      truncated: Boolean(nextToken),
      totalEvents: items.length,
      byVariant,
      acquisition: {
        attributedSessions: attributionBySession.size,
        byChannel,
        bySourceMedium,
        byCampaign,
        byVariantChannel,
      },
    });
  } catch (error) {
    console.error('Failed to build AB summary:', error);
    return res.status(500).json({ error: 'Failed to build AB summary' });
  }
}
