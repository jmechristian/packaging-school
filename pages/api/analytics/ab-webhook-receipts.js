import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';
import { buildCreatedAtCondition, parseDateInput } from '../../../libs/abAnalyticsQueries';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const WEBHOOK_SOURCE = 'thinkific_order_webhook';
const MAX_RUNTIME_MS = 7000;

const receiptsBySourceQuery = /* GraphQL */ `
  query AbWebhookReceiptsBySource(
    $source: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAbWebhookReceiptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    abWebhookReceiptsBySourceAndCreatedAt(
      source: $source
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        decision
        reason
        action
        status
        externalOrderId
        orderNumber
        email
        variant
        matchedSessionId
        matchedIntentId
        attributionMethod
        abEventId
        createdAt
      }
      nextToken
    }
  }
`;

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

  const from = parseDateInput(req.query.from);
  const to = parseDateInput(req.query.to);
  const createdAt = buildCreatedAtCondition(from, to);
  const maxItems = parseBoundedInt(req.query.maxItems, 2000, 100, 20000);

  try {
    let items = [];
    let nextToken = null;
    const startedAt = Date.now();
    let truncated = false;

    // Webhook receipts are low-volume; the source GSI returns them
    // chronologically without a table scan.
    do {
      const response = await API.graphql({
        query: receiptsBySourceQuery,
        variables: {
          source: WEBHOOK_SOURCE,
          createdAt,
          sortDirection: 'DESC',
          limit: 500,
          nextToken,
        },
      });
      const data = response?.data?.abWebhookReceiptsBySourceAndCreatedAt;
      items = items.concat(data?.items || []);
      nextToken = data?.nextToken || null;
      if (Date.now() - startedAt >= MAX_RUNTIME_MS) {
        truncated = true;
        break;
      }
    } while (nextToken && items.length < maxItems);

    const byDecision = {};
    for (const item of items) {
      const decision = item.decision || 'unknown';
      byDecision[decision] = (byDecision[decision] || 0) + 1;
    }

    return res.status(200).json({
      from,
      to,
      truncated: Boolean(nextToken) || truncated,
      count: items.length,
      byDecision,
      items: items.slice(0, 500),
    });
  } catch (error) {
    console.error('Failed to load webhook receipts:', error);
    return res.status(500).json({ error: 'Failed to load webhook receipts' });
  }
}
