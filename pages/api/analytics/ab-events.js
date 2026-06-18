import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const listAbEventsQuery = /* GraphQL */ `
  query ListAbEvents(
    $filter: ModelAbTestEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAbTestEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventName
        variant
        sessionId
        orderId
        externalOrderId
        orderNumber
        purchaserEmail
        purchaserFirstName
        purchaserLastName
        couponCode
        grossAmountCents
        netAmountCents
        discountAmountCents
        pagePath
        deviceType
        acquisitionChannel
        acquisitionSource
        acquisitionMedium
        acquisitionCampaign
        nextPath
        previousPath
        metric
        value
        source
        referrer
        reason
        metadata
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
    event?.externalOrderId,
  ]
    .map((value) => String(value || '').toLowerCase())
    .join(' ');
  return haystack.includes(query);
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
  const search = normalizeSearchTerm(req.query.search || '');
  const from = parseDateInput(req.query.from);
  const to = parseDateInput(req.query.to);
  const filter = {
    experimentKey: { eq: experimentKey },
    ...(sessionId ? { sessionId: { eq: sessionId } } : {}),
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
    let items = [];
    let nextToken = requestedNextToken;
    let responseNextToken = null;
    const pageSize = 250;

    if (!includeAll && !search) {
      const response = await API.graphql({
        query: listAbEventsQuery,
        variables: {
          filter,
          limit,
          nextToken,
        },
      });
      items = response?.data?.listAbTestEvents?.items || [];
      responseNextToken = response?.data?.listAbTestEvents?.nextToken || null;
    } else {
      do {
        const response = await API.graphql({
          query: listAbEventsQuery,
          variables: {
            filter,
            limit: pageSize,
            nextToken,
          },
        });

        const pageItems = response?.data?.listAbTestEvents?.items || [];
        const matchedItems = search
          ? pageItems.filter((event) => eventMatchesSearch(event, search))
          : pageItems;
        items = items.concat(matchedItems);
        nextToken = response?.data?.listAbTestEvents?.nextToken || null;
        responseNextToken = nextToken;
      } while (nextToken && (includeAll || items.length < limit));
    }

    const sorted = items
      .slice(0, includeAll ? items.length : limit)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      experimentKey,
      from,
      to,
      includeAll,
      limit,
      search: search || null,
      sessionId,
      nextToken: responseNextToken,
      count: sorted.length,
      items: sorted,
    });
  } catch (error) {
    console.error('Failed to load AB events:', error);
    return res.status(500).json({ error: 'Failed to load AB events' });
  }
}
