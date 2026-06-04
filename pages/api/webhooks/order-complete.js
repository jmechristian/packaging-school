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
    const action = normalizeString(body.action || payload.action);

    if (action && !['paid', 'completed', 'purchase'].includes(action)) {
      return res.status(200).json({
        success: true,
        ignored: true,
        reason: `Webhook action '${action}' does not represent completed sale`,
      });
    }

    const orderId = normalizeString(payload.order_id || payload.id);
    if (!orderId) {
      return res.status(400).json({ error: 'Missing order id in webhook payload' });
    }

    const orderResponse = await API.graphql({
      query: getOrderQuery,
      variables: { id: orderId },
    });

    const existingOrder = orderResponse?.data?.getOrder;
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (existingOrder.status === 'COMPLETE') {
      return res.status(200).json({
        success: true,
        message: 'Order already completed',
        orderId,
      });
    }

    await API.graphql({
      query: updateOrderMutation,
      variables: {
        input: {
          id: orderId,
          status: 'COMPLETE',
        },
      },
    });

    const metadata = payload.metadata || payload.custom_fields || null;
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
          userID: normalizeString(existingOrder.userID),
          pagePath: normalizeString(existingOrder.page),
          orderId,
          externalOrderId: normalizeString(
            payload.external_order_id || payload.transaction_id,
          ),
          source: 'lms_webhook',
          metadata: metadata ? JSON.stringify(metadata) : null,
          createdAt: new Date().toISOString(),
        },
      },
    });

    return res.status(200).json({ success: true, orderId });
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
