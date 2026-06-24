// Shared server-side helpers for A/B analytics indexed (GSI) queries.
// These avoid full DynamoDB table scans by querying the secondary indexes
// defined on the AbTestEvent model (experimentKey, experimentDay, eventName,
// sessionId, email) - all sorted by createdAt.

export const EVENT_FULL_FIELDS = `
  id
  experimentKey
  eventName
  variant
  sessionId
  userID
  email
  pagePath
  deviceType
  acquisitionChannel
  acquisitionSource
  acquisitionMedium
  acquisitionCampaign
  acquisitionTerm
  acquisitionContent
  referrer
  previousPath
  nextPath
  metric
  value
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
  matchedIntentId
  attributionMethod
  source
  reason
  metadata
  createdAt
`;

export const EVENT_SUMMARY_FIELDS = `
  eventName
  variant
  sessionId
  acquisitionChannel
  acquisitionSource
  acquisitionMedium
  acquisitionCampaign
  createdAt
`;

// Query an experiment's events by the experimentKey GSI, sorted by createdAt.
// Used for the dashboard events table (single, clean cursor pagination).
export const eventsByExperimentKeyQuery = (fields = EVENT_FULL_FIELDS) => /* GraphQL */ `
  query AbEventsByExperimentKey(
    $experimentKey: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAbTestEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    abTestEventsByExperimentKeyAndCreatedAt(
      experimentKey: $experimentKey
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ${fields}
      }
      nextToken
    }
  }
`;

// Query a single day partition (experimentDay = "<experimentKey>#YYYY-MM-DD").
// Used for bounded, fan-out summary aggregation across a date range.
export const eventsByExperimentDayQuery = (fields = EVENT_SUMMARY_FIELDS) => /* GraphQL */ `
  query AbEventsByExperimentDay(
    $experimentDay: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAbTestEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    abTestEventsByExperimentDayAndCreatedAt(
      experimentDay: $experimentDay
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ${fields}
      }
      nextToken
    }
  }
`;

// Query a single event type (e.g. ab_purchase_complete) by the eventName GSI.
export const eventsByEventNameQuery = (fields = EVENT_FULL_FIELDS) => /* GraphQL */ `
  query AbEventsByEventName(
    $eventName: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAbTestEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    abTestEventsByEventNameAndCreatedAt(
      eventName: $eventName
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ${fields}
      }
      nextToken
    }
  }
`;

// Query an entire session journey by the sessionId GSI, chronological.
export const eventsBySessionIdQuery = (fields = EVENT_FULL_FIELDS) => /* GraphQL */ `
  query AbEventsBySessionId(
    $sessionId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAbTestEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    abTestEventsBySessionIdAndCreatedAt(
      sessionId: $sessionId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ${fields}
      }
      nextToken
    }
  }
`;

// Query intents/events by buyer email (used by the webhook for attribution).
export const eventsByEmailQuery = (fields = EVENT_FULL_FIELDS) => /* GraphQL */ `
  query AbEventsByEmail(
    $email: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAbTestEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    abTestEventsByEmailAndCreatedAt(
      email: $email
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ${fields}
      }
      nextToken
    }
  }
`;

export function parseDateInput(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

// Build a ModelStringKeyConditionInput for the createdAt sort key.
export function buildCreatedAtCondition(from, to) {
  if (from && to) return { between: [from, to] };
  if (from) return { ge: from };
  if (to) return { le: to };
  return undefined;
}

function toUtcDayString(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Compute the experimentDay partition value for a given createdAt ISO string.
export function toExperimentDay(experimentKey, createdAtIso) {
  const date = createdAtIso ? new Date(createdAtIso) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
  return `${experimentKey}#${toUtcDayString(safeDate)}`;
}

// Enumerate UTC day strings (YYYY-MM-DD) inclusive between from and to.
// Falls back to the trailing `defaultDays` window when bounds are missing.
export function enumerateUtcDays(fromIso, toIso, defaultDays = 30, maxDays = 120) {
  const end = toIso ? new Date(toIso) : new Date();
  const safeEnd = Number.isNaN(end.getTime()) ? new Date() : end;

  let start;
  if (fromIso) {
    const parsed = new Date(fromIso);
    start = Number.isNaN(parsed.getTime())
      ? new Date(safeEnd.getTime() - defaultDays * 86400000)
      : parsed;
  } else {
    start = new Date(safeEnd.getTime() - defaultDays * 86400000);
  }

  let cursor = new Date(
    Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()),
  );
  const last = new Date(
    Date.UTC(safeEnd.getUTCFullYear(), safeEnd.getUTCMonth(), safeEnd.getUTCDate()),
  );

  const days = [];
  while (cursor <= last && days.length < maxDays) {
    days.push(toUtcDayString(cursor));
    cursor = new Date(cursor.getTime() + 86400000);
  }
  return days;
}
