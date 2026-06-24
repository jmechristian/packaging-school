import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';
import { toExperimentDay } from '../../../libs/abAnalyticsQueries';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const createAbExposureMutation = /* GraphQL */ `
  mutation CreateAbTestExposure($input: CreateAbTestExposureInput!) {
    createAbTestExposure(input: $input) {
      id
    }
  }
`;

const createAbEventMutation = /* GraphQL */ `
  mutation CreateAbTestEvent($input: CreateAbTestEventInput!) {
    createAbTestEvent(input: $input) {
      id
    }
  }
`;

function safeString(value) {
  if (value === null || value === undefined) return null;
  return String(value);
}

function safeInt(value) {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.round(parsed) : null;
}

function isDuplicateMutationError(error) {
  const raw = JSON.stringify(error || {});
  return (
    raw.includes('ConditionalCheckFailedException') ||
    raw.includes('already exists') ||
    raw.includes('The conditional request failed')
  );
}

function fallbackEventId(eventName, payload) {
  const key = [
    eventName,
    payload.experimentKey || '',
    payload.variant || '',
    payload.sessionId || '',
    payload.pagePath || '',
    payload.nextPath || '',
    payload.previousPath || '',
    payload.metric || '',
    payload.value ?? '',
    payload.source || '',
    payload.reason || '',
  ].join('|');

  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return `ab_${Math.abs(hash).toString(36)}_${Math.floor(Date.now() / 1500)}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      eventName,
      experimentKey,
      variant,
      sessionId,
      userID,
      pagePath,
      deviceType,
      acquisitionChannel,
      acquisitionSource,
      acquisitionMedium,
      acquisitionCampaign,
      acquisitionTerm,
      acquisitionContent,
      previousPath,
      nextPath,
      metric,
      value,
      orderId,
      externalOrderId,
      orderNumber,
      email,
      purchaserEmail,
      purchaserFirstName,
      purchaserLastName,
      couponCode,
      grossAmountCents,
      netAmountCents,
      discountAmountCents,
      matchedIntentId,
      attributionMethod,
      source,
      referrer,
      reason,
      metadata,
      eventId,
    } = req.body || {};

    if (!eventName || !experimentKey) {
      return res
        .status(400)
        .json({ error: 'eventName and experimentKey are required' });
    }

    const forwardedFor = req.headers['x-forwarded-for'];
    const ipAddress = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : safeString(forwardedFor?.split(',')[0]) || safeString(req.socket?.remoteAddress);

    const createdAt = new Date().toISOString();
    const experimentDay = toExperimentDay(experimentKey, createdAt);
    const rawEmail =
      safeString(email) ||
      safeString(purchaserEmail) ||
      safeString(metadata?.email) ||
      null;
    // Canonicalize so the email GSI partition key matches across intent writes
    // and the order webhook's deterministic email lookup.
    const resolvedEmail = rawEmail ? rawEmail.trim().toLowerCase() : null;
    const resolvedEventId =
      safeString(eventId) ||
      fallbackEventId(eventName, {
        experimentKey,
        variant,
        sessionId,
        pagePath,
        nextPath,
        previousPath,
        metric,
        value,
        source,
        reason,
      });

    if (eventName === 'ab_exposure') {
      try {
        await API.graphql({
          query: createAbExposureMutation,
          variables: {
            input: {
              id: resolvedEventId,
              experimentKey: safeString(experimentKey),
              variant: safeString(variant) || 'A',
              sessionId: safeString(sessionId),
              userID: safeString(userID),
              pagePath: safeString(pagePath),
              deviceType: safeString(deviceType),
              acquisitionChannel: safeString(acquisitionChannel),
              acquisitionSource: safeString(acquisitionSource),
              acquisitionMedium: safeString(acquisitionMedium),
              acquisitionCampaign: safeString(acquisitionCampaign),
              acquisitionTerm: safeString(acquisitionTerm),
              acquisitionContent: safeString(acquisitionContent),
              source: safeString(source),
              referrer: safeString(referrer),
              ipAddress,
              createdAt,
            },
          },
        });
      } catch (error) {
        if (!isDuplicateMutationError(error)) {
          throw error;
        }
      }
    }

    try {
      await API.graphql({
        query: createAbEventMutation,
        variables: {
          input: {
            id: resolvedEventId,
            experimentKey: safeString(experimentKey),
            experimentDay,
            eventName: safeString(eventName),
            variant: safeString(variant),
            sessionId: safeString(sessionId),
            userID: safeString(userID),
            email: resolvedEmail,
            pagePath: safeString(pagePath),
            deviceType: safeString(deviceType),
            acquisitionChannel: safeString(acquisitionChannel),
            acquisitionSource: safeString(acquisitionSource),
            acquisitionMedium: safeString(acquisitionMedium),
            acquisitionCampaign: safeString(acquisitionCampaign),
            acquisitionTerm: safeString(acquisitionTerm),
            acquisitionContent: safeString(acquisitionContent),
            referrer: safeString(referrer),
            previousPath: safeString(previousPath),
            nextPath: safeString(nextPath),
            metric: safeString(metric),
            value: safeInt(value),
            orderId: safeString(orderId),
            externalOrderId: safeString(externalOrderId),
            orderNumber: safeString(orderNumber),
            purchaserEmail: safeString(purchaserEmail),
            purchaserFirstName: safeString(purchaserFirstName),
            purchaserLastName: safeString(purchaserLastName),
            couponCode: safeString(couponCode),
            grossAmountCents: safeInt(grossAmountCents),
            netAmountCents: safeInt(netAmountCents),
            discountAmountCents: safeInt(discountAmountCents),
            matchedIntentId: safeString(matchedIntentId),
            attributionMethod: safeString(attributionMethod),
            source: safeString(source),
            reason: safeString(reason),
            ipAddress,
            metadata: metadata ? JSON.stringify(metadata) : null,
            createdAt,
          },
        },
      });
    } catch (error) {
      if (!isDuplicateMutationError(error)) {
        throw error;
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error writing AB event:', error);
    return res.status(500).json({ error: 'Failed to write AB event' });
  }
}
