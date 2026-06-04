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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const experimentKey =
    typeof req.query.experimentKey === 'string' && req.query.experimentKey.trim()
      ? req.query.experimentKey.trim()
      : 'home_v1';

  const limit = Math.min(Number(req.query.limit) || 200, 1000);
  const from = parseDateInput(req.query.from);
  const to = parseDateInput(req.query.to);
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
    let items = [];
    let nextToken = null;

    do {
      const response = await API.graphql({
        query: listAbEventsQuery,
        variables: {
          filter,
          limit: Math.min(limit, 1000),
          nextToken,
        },
      });

      const pageItems = response?.data?.listAbTestEvents?.items || [];
      items = items.concat(pageItems);
      nextToken = response?.data?.listAbTestEvents?.nextToken || null;
    } while (nextToken && items.length < limit);

    const sorted = items
      .slice(0, limit)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      experimentKey,
      from,
      to,
      count: sorted.length,
      items: sorted,
    });
  } catch (error) {
    console.error('Failed to load AB events:', error);
    return res.status(500).json({ error: 'Failed to load AB events' });
  }
}
