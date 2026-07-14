# Packaging School — Analytics Reporting Integration Guide

This document describes the A/B / path-to-purchase analytics data so a separate
**reporting/dashboard codebase** can pull and analyze it. The main site codebase
is **write-only**: it emits events and links purchases. All reporting/reads live
in the dashboard codebase against the same backend described here.

---

## 1. Connection

- **Type:** AWS AppSync (GraphQL) backed by DynamoDB.
- **Endpoint:** `https://tymmbuxak5brte5efa6em4rphm.appsync-api.us-east-1.amazonaws.com/graphql`
- **Region:** `us-east-1`
- **Auth:** API key via header `x-api-key: <key>`.
  - Get a **valid** key from the AppSync console.
  - Recommended: provision a **dedicated read-only API key** for the dashboard
    instead of reusing the site's write key.
- Treat this integration as **read-only**. Never write events from the dashboard.

Minimal fetch example:

```js
const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
  body: JSON.stringify({ query, variables }),
});
const { data } = await res.json();
```

---

## 2. Core model: `AbTestEvent`

Every user action is one row.

| Field | Meaning |
|---|---|
| `id` | Unique event id. Idempotent — dedupe on this. |
| `eventName` | Event type (see taxonomy). |
| `experimentKey` | Always `home_v1`. Legacy partition; use as the "all events" key. |
| `visitorId` | **Persistent browser id — the primary key for a journey.** ~2yr cookie. |
| `sessionId` | A single visit (~6h sliding window). |
| `email` | Lowercased. Set for logged-in browsing and purchases. |
| `userID` | App user id (set at checkout; often null). |
| `pagePath`, `previousPath`, `nextPath` | Navigation. |
| `acquisitionChannel` / `Source` / `Medium` / `Campaign` / `Term` / `Content` | Last-touch attribution captured on that event. |
| `referrer` | Referring URL. |
| `deviceType`, `country`, `ipAddress` | Context. |
| `metric`, `value` | Engagement events (e.g. `metric='scroll_depth'`, `value=50`). |
| `orderId`, `externalOrderId`, `orderNumber` | Order identifiers (on completes). |
| `purchaserEmail`, `purchaserFirstName`, `purchaserLastName` | Buyer identity. |
| `grossAmountCents`, `netAmountCents`, `discountAmountCents`, `couponCode` | Revenue. |
| `matchedIntentId` | The `ab_purchase_intent` event id this complete was linked to. |
| `attributionMethod` | How the sale was attributed (`payload`, email match, `none`, etc.). |
| `metadata` | JSON blob of enrichments (see below). |
| `createdAt` | ISO8601 UTC, server time. Sort key on every index. |

### `metadata` JSON keys

```
schemaVersion   // integer; currently 2. Branch on this as the shape evolves.
clientTs        // ISO client emit time — use for precise ordering.
eventSeq        // monotonic per-session counter — tiebreaker for ordering.
userAgent       // for bot filtering.
firstTouch      // { channel, source, medium, campaign, referrer, landingPath, firstSeenAt }
// ab_product_view also includes:
contentType     // e.g. "course"
contentId       // course slug or id
productName
priceId         // thinkific/course id
price
courseType
liFatId         // LinkedIn click id, when present (for CAPI replay)
```

---

## 3. Identity model

Three keys, most-durable to least:

1. **`visitorId`** — same browser across all visits and days. The backbone of a
   journey. Present on every event emitted after launch. (Historical rows are `null`.)
2. **`email`** — lowercased. Present on logged-in browsing and all purchases.
   Bridges a visitor to their purchase and across devices where they log in.
3. **`sessionId`** — one visit. Use for within-visit sequences.

To assemble a person: pull by `visitorId`, then optionally union by `email`
(a logged-in user may have multiple visitorIds across devices).

---

## 4. Event taxonomy (`eventName`)

| Event | Meaning |
|---|---|
| `ab_page_view` | Page view. |
| `ab_nav_next` | Navigation between pages (`pagePath` -> `nextPath`). |
| `ab_engagement` | Engagement metric. `metric='scroll_depth'`, `value=25\|50\|75\|100`. |
| `ab_product_view` | Viewed a purchasable product/course page (product context in metadata). |
| `ab_meeting_click` | Clicked "Speak with a real human" / meeting CTA. |
| `ab_pdf_click` | Clicked a curriculum/PDF download CTA. |
| `ab_lesson_click` | Clicked a free lesson card. |
| `ab_promo_click` | Clicked a promotional banner. |
| `ab_purchase_intent` | Started checkout (carries `email`, `visitorId`). |
| `ab_purchase_complete` | Confirmed sale from the LMS webhook (order fields + `matchedIntentId`). |
| `ab_session_end` | Visit ended (reason in `reason`). |
| `ab_exposure` | Legacy A/B exposure. No longer emitted; historical only. |

Purchase audit trail: `AbWebhookReceipt` records every inbound webhook hit
(query `abWebhookReceiptsBySourceAndCreatedAt`, source `thinkific_order_webhook`).

---

## 5. Available indexed queries

All are AppSync list queries returning `{ items, nextToken }`. Each accepts:

- the partition key (see table),
- `createdAt: ModelStringKeyConditionInput` (`{ between: [from, to] }`, `{ ge }`, `{ le }`),
- `sortDirection: ASC | DESC`,
- `filter: ModelAbTestEventFilterInput`,
- `limit: Int` (max 1000/page),
- `nextToken: String`.

| Query | Partition key | Use for |
|---|---|---|
| `abTestEventsByVisitorIdAndCreatedAt` | `visitorId` | **A full cross-visit journey for one visitor.** |
| `abTestEventsByEmailAndCreatedAt` | `email` (lowercased) | All events for a person. |
| `abTestEventsBySessionIdAndCreatedAt` | `sessionId` | A single visit's events. |
| `abTestEventsByEventNameAndCreatedAt` | `eventName` | All events of one type (e.g. every complete). |
| `abTestEventsByExperimentKeyAndCreatedAt` | `experimentKey` (`home_v1`) | Everything in a time window. |
| `abTestEventsByExperimentDayAndCreatedAt` | `experimentDay` (`home_v1#YYYY-MM-DD`) | One UTC day partition — best for scalable day-by-day scans. |
| `abTestEventsByUserIDAndCreatedAt` | `userID` | Events by app user id. |

---

## 6. Example queries

### Reconstruct one purchase journey

```graphql
query VisitorJourney($visitorId: String!, $nextToken: String) {
  abTestEventsByVisitorIdAndCreatedAt(
    visitorId: $visitorId
    sortDirection: ASC
    limit: 500
    nextToken: $nextToken
  ) {
    items {
      id
      eventName
      pagePath
      createdAt
      acquisitionChannel
      acquisitionSource
      acquisitionCampaign
      metric
      value
      metadata
    }
    nextToken
  }
}
```

### All completes in a date range

```graphql
query Completes($from: String!, $to: String!, $nextToken: String) {
  abTestEventsByEventNameAndCreatedAt(
    eventName: "ab_purchase_complete"
    createdAt: { between: [$from, $to] }
    sortDirection: DESC
    limit: 200
    nextToken: $nextToken
  ) {
    items {
      id
      visitorId
      email
      createdAt
      matchedIntentId
      attributionMethod
      grossAmountCents
      netAmountCents
      orderNumber
      acquisitionChannel
      acquisitionCampaign
    }
    nextToken
  }
}
```

### Scan a day partition (scalable window aggregation)

```graphql
query Day($day: String!, $nextToken: String) {
  abTestEventsByExperimentDayAndCreatedAt(
    experimentDay: $day          # e.g. "home_v1#2026-07-13"
    sortDirection: ASC
    limit: 1000
    nextToken: $nextToken
  ) {
    items { id eventName visitorId email createdAt }
    nextToken
  }
}
```

---

## 7. Building the key reports

- **Full path to purchase:** query completes for the window; for each buyer's
  `visitorId`, pull `abTestEventsByVisitorIdAndCreatedAt` and order by
  `createdAt` (tiebreak on `metadata.clientTs`, then `metadata.eventSeq`).
- **Time-to-purchase & visit count:** `metadata.firstTouch.firstSeenAt` ->
  complete `createdAt`; count distinct `sessionId` in between.
- **First-touch vs last-touch attribution:** `metadata.firstTouch.*` vs the
  acquisition fields on the intent/complete event.
- **View -> intent -> complete funnel:** count distinct `visitorId` at
  `ab_product_view`, `ab_purchase_intent`, `ab_purchase_complete`; join by `visitorId`.
- **Content influence:** for converting `visitorId`s, tally
  `ab_product_view.metadata.contentId` and the pages that precede intent.
- **Channel/campaign performance:** group completes and their journeys by
  `acquisitionChannel` / `acquisitionCampaign` (first-touch for discovery,
  last-touch for closing).

---

## 8. Conventions & gotchas

- Paginate with `nextToken`; `limit` maxes at 1000 per page.
- All timestamps (`createdAt`, `metadata.clientTs`, `firstTouch.firstSeenAt`) are ISO8601 UTC.
- Dedupe on `id` — event writes are idempotent, so the same `id` can appear if re-fetched across overlapping windows.
- `email` is stored lowercased — lowercase your lookups.
- **Historical data:** rows created before the path-to-purchase launch have
  `visitorId = null` and `metadata.schemaVersion` absent/1. Exclude them from
  journey/funnel stats; they remain valid for coarse counts.
- **Bot hygiene:** drop rows whose `metadata.userAgent` matches bot/crawler patterns.
- `experimentKey` is always `home_v1` (a legacy label from the A/B era). It is not
  a live experiment — treat it as the global partition for "all events".
