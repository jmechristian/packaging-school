import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';
import {
  EVENT_FULL_FIELDS,
  buildCreatedAtCondition,
  eventsByExperimentKeyQuery,
  eventsBySessionIdQuery,
  parseDateInput,
} from '../../../libs/abAnalyticsQueries';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const experimentKeyQuery = eventsByExperimentKeyQuery(EVENT_FULL_FIELDS);
const sessionQuery = eventsBySessionIdQuery(EVENT_FULL_FIELDS);

// Bound how hard we work when free-text searching (which cannot use an index).
const SEARCH_MAX_PAGES = 20;
const SEARCH_PAGE_SIZE = 500;
const SEARCH_MAX_RUNTIME_MS = 7000;

function normalizeSearchTerm(value) {
  if (typeof value !== 'string') return '';
  return value.trim().toLowerCase();
}

function eventMatchesSearch(event, query) {
  if (!query) return true;
  const haystack = [
    event?.eventName,
    event?.variant,
    event?.sessionId,
    event?.pagePath,
    event?.nextPath,
    event?.previousPath,
    event?.source,
    event?.orderNumber,
    event?.purchaserEmail,
    event?.email,
    event?.externalOrderId,
  ]
    .map((value) => String(value || '').toLowerCase())
    .join(' ');
  return haystack.includes(query);
}

// Optional server-side structured filters that map cleanly onto a GSI query's
// `filter` argument (applied after the key condition, still index-scoped).
function buildStructuredFilter({ eventName, variant }) {
  const conditions = [];
  if (eventName) conditions.push({ eventName: { eq: eventName } });
  if (variant) conditions.push({ variant: { eq: variant } });
  if (!conditions.length) return undefined;
  if (conditions.length === 1) return conditions[0];
  return { and: conditions };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const experimentKey =
    typeof req.query.experimentKey === 'string' && req.query.experimentKey.trim()
      ? req.query.experimentKey.trim()
      : 'home_v1';

  const includeAll = String(req.query.all || '').toLowerCase() === 'true';
  const limit = includeAll
    ? Number.MAX_SAFE_INTEGER
    : Math.min(Number(req.query.limit) || 200, 1000);
  const requestedNextToken =
    typeof req.query.nextToken === 'string' && req.query.nextToken.trim()
      ? req.query.nextToken
      : null;
  const sessionId =
    typeof req.query.sessionId === 'string' && req.query.sessionId.trim()
      ? req.query.sessionId.trim()
      : null;
  const eventName =
    typeof req.query.eventName === 'string' && req.query.eventName.trim()
      ? req.query.eventName.trim()
      : null;
  const variant =
    typeof req.query.variant === 'string' && req.query.variant.trim()
      ? req.query.variant.trim()
      : null;
  const search = normalizeSearchTerm(req.query.search || '');
  const from = parseDateInput(req.query.from);
  const to = parseDateInput(req.query.to);
  const createdAt = buildCreatedAtCondition(from, to);
  const structuredFilter = buildStructuredFilter({ eventName, variant });

  try {
    // ---- Session journey: query the sessionId GSI, fully + chronologically.
    if (sessionId) {
      let items = [];
      let nextToken = null;
      do {
        const response = await API.graphql({
          query: sessionQuery,
          variables: {
            sessionId,
            createdAt,
            sortDirection: 'ASC',
            filter: structuredFilter,
            limit: 1000,
            nextToken,
          },
        });
        const data = response?.data?.abTestEventsBySessionIdAndCreatedAt;
        items = items.concat(data?.items || []);
        nextToken = data?.nextToken || null;
      } while (nextToken && items.length < 5000);

      return res.status(200).json({
        experimentKey,
        sessionId,
        from,
        to,
        includeAll: true,
        count: items.length,
        nextToken: null,
        items,
      });
    }

    // ---- Free-text search: bounded, index-ordered pagination + JS filter.
    if (search) {
      let items = [];
      let nextToken = requestedNextToken;
      let pages = 0;
      const startedAt = Date.now();
      do {
        const response = await API.graphql({
          query: experimentKeyQuery,
          variables: {
            experimentKey,
            createdAt,
            sortDirection: 'DESC',
            filter: structuredFilter,
            limit: SEARCH_PAGE_SIZE,
            nextToken,
          },
        });
        const data = response?.data?.abTestEventsByExperimentKeyAndCreatedAt;
        const pageItems = data?.items || [];
        items = items.concat(pageItems.filter((event) => eventMatchesSearch(event, search)));
        nextToken = data?.nextToken || null;
        pages += 1;
      } while (
        nextToken &&
        items.length < limit &&
        pages < SEARCH_MAX_PAGES &&
        Date.now() - startedAt < SEARCH_MAX_RUNTIME_MS
      );

      const sliced = items.slice(0, limit);
      return res.status(200).json({
        experimentKey,
        from,
        to,
        includeAll,
        limit,
        search,
        sessionId: null,
        count: sliced.length,
        nextToken,
        items: sliced,
      });
    }

    // ---- Default + includeAll: experimentKey GSI, DESC, cursor pagination.
    let items = [];
    let nextToken = requestedNextToken;
    let responseNextToken = null;

    if (!includeAll) {
      const response = await API.graphql({
        query: experimentKeyQuery,
        variables: {
          experimentKey,
          createdAt,
          sortDirection: 'DESC',
          filter: structuredFilter,
          limit,
          nextToken,
        },
      });
      const data = response?.data?.abTestEventsByExperimentKeyAndCreatedAt;
      items = data?.items || [];
      responseNextToken = data?.nextToken || null;
    } else {
      do {
        const response = await API.graphql({
          query: experimentKeyQuery,
          variables: {
            experimentKey,
            createdAt,
            sortDirection: 'DESC',
            filter: structuredFilter,
            limit: 1000,
            nextToken,
          },
        });
        const data = response?.data?.abTestEventsByExperimentKeyAndCreatedAt;
        items = items.concat(data?.items || []);
        nextToken = data?.nextToken || null;
        responseNextToken = nextToken;
      } while (nextToken && items.length < 20000);
    }

    return res.status(200).json({
      experimentKey,
      from,
      to,
      includeAll,
      limit,
      search: null,
      sessionId: null,
      eventName,
      variant,
      nextToken: responseNextToken,
      count: items.length,
      items,
    });
  } catch (error) {
    console.error('Failed to load AB events:', error);
    return res.status(500).json({ error: 'Failed to load AB events' });
  }
}
