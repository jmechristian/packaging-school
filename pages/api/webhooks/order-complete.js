import crypto from 'crypto';
import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const getOrderQuery = /* GraphQL */ `
  query GetOrderForCompletion($id: ID!) {
    getOrder(id: $id) {
      id
      status
      userID
      page
    }
  }
`;

const updateOrderMutation = /* GraphQL */ `
  mutation UpdateOrderForCompletion($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      id
      status
    }
  }
`;

const createAbEventMutation = /* GraphQL */ `
  mutation CreateAbTestEventForCompletion($input: CreateAbTestEventInput!) {
    createAbTestEvent(input: $input) {
      id
    }
  }
`;

function verifyWebhookSignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex');

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

function normalizeString(value) {
  if (value === undefined || value === null || value === '') return null;
  return String(value);
}

function normalizeLower(value) {
  const normalized = normalizeString(value);
  return normalized ? normalized.toLowerCase() : null;
}

function isLikelyInternalOrderId(value) {
  const normalized = normalizeString(value);
  if (!normalized) return false;
  if (/^\d+$/.test(normalized)) return false;
  return normalized.length >= 12;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawBody = await readRawBody(req);
    let body = {};
    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }

    const webhookSecret = process.env.THINKIFIC_WEBHOOK_SECRET;
    const signature =
      req.headers['x-thinkific-signature'] || req.headers['x-webhook-signature'];

    if (webhookSecret && signature) {
      const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid webhook signature' });
      }
    }

    const payload = body.payload || body;
    const action = normalizeLower(body.action || payload.action);
    const orderStatus = normalizeLower(payload.status);
    const looksCompleted =
      ['paid', 'completed', 'purchase'].includes(action || '') ||
      ['complete', 'completed', 'paid'].includes(orderStatus || '');

    if (!looksCompleted) {
      return res.status(200).json({
        success: true,
        ignored: true,
        reason: `Webhook action/status '${action || 'unknown'}/${orderStatus || 'unknown'}' does not represent completed sale`,
      });
    }

    const metadata = payload.metadata || payload.custom_fields || null;
    const possibleInternalOrderId = normalizeString(
      payload.order_id || payload.internal_order_id || metadata?.order_id,
    );
    const externalOrderId = normalizeString(
      payload.external_order_id ||
        payload.transaction_id ||
        payload.order_number ||
        payload.id,
    );

    let existingOrder = null;

    if (isLikelyInternalOrderId(possibleInternalOrderId)) {
      try {
        const orderResponse = await API.graphql({
          query: getOrderQuery,
          variables: { id: possibleInternalOrderId },
        });
        existingOrder = orderResponse?.data?.getOrder || null;
      } catch (error) {
        console.warn('Failed to fetch internal order for webhook:', error?.message);
      }
    }

    if (existingOrder && existingOrder.status !== 'COMPLETE') {
      await API.graphql({
        query: updateOrderMutation,
        variables: {
          input: {
            id: existingOrder.id,
            status: 'COMPLETE',
          },
        },
      });
    }

    const variant = normalizeString(
      payload.ab_variant || payload.variant || metadata?.ab_variant,
    );
    const sessionId = normalizeString(
      payload.ab_session_id || payload.session_id || metadata?.ab_session_id,
    );
    const deviceType = normalizeString(
      payload.device_type || payload.device || metadata?.device_type || metadata?.device,
    );
    const acquisitionChannel = normalizeString(
      payload.acquisition_channel || metadata?.acquisition_channel,
    );
    const acquisitionSource = normalizeString(
      payload.acquisition_source || metadata?.acquisition_source,
    );
    const acquisitionMedium = normalizeString(
      payload.acquisition_medium || metadata?.acquisition_medium,
    );
    const acquisitionCampaign = normalizeString(
      payload.acquisition_campaign || metadata?.acquisition_campaign,
    );

    await API.graphql({
      query: createAbEventMutation,
      variables: {
        input: {
          experimentKey: 'home_v1',
          eventName: 'ab_purchase_complete',
          variant,
          sessionId,
          deviceType,
          acquisitionChannel,
          acquisitionSource,
          acquisitionMedium,
          acquisitionCampaign,
          userID: normalizeString(
            existingOrder?.userID || payload?.user?.id || metadata?.user_id,
          ),
          pagePath: normalizeString(existingOrder?.page || metadata?.page_path),
          orderId: normalizeString(existingOrder?.id || possibleInternalOrderId),
          externalOrderId,
          source: 'lms_webhook',
          metadata: metadata ? JSON.stringify(metadata) : null,
          createdAt: new Date().toISOString(),
        },
      },
    });

    return res.status(200).json({
      success: true,
      internalOrderId: existingOrder?.id || possibleInternalOrderId || null,
      externalOrderId,
      matchedInternalOrder: Boolean(existingOrder),
    });
  } catch (error) {
    console.error('Order completion webhook failed:', error);
    return res.status(500).json({ error: 'Failed to process order webhook' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
