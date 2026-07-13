// Shared server-side helpers for A/B analytics indexed (GSI) queries.
// This codebase is write/tracking-only: it emits events and the order webhook
// links purchases to intents. Read/reporting queries now live in the separate
// analytics dashboard codebase. Only the helpers used by the write path remain:
//   - eventsByEmailQuery: webhook intent lookup via the abEventByEmail GSI
//   - toExperimentDay:    stamps the experimentDay partition on every event

export const EVENT_FULL_FIELDS = `
  id
  experimentKey
  eventName
  variant
  sessionId
  visitorId
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
