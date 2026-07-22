import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';
import { createEmailSubscription } from '../../../src/graphql/mutations';
import { subscribeToMailingList } from '../../../helpers/utils';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

// Thinkific user.signup webhook → Active Campaign mailing list.
// Mirrors FooterEmailSignup ("Stay Up To Date"): AC form 90 + EmailSubscription record.
// Lead Source is set to "thinkific" when empty.
//
// Payload Sample:
// {
//   "id": "20180123170248040678392",
//   "resource": "user",
//   "action": "signup",
//   "tenant_id": "73394",
//   "created_at": "2018-01-23T22:02:45.001Z",
//   "payload": {
//     "email": "ninjas@thinkific.com",
//     "first_name": "Robert",
//     "last_name": "Smith",
//     "company": null,
//     "id": 123456
//   }
// }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body;
    console.log('Thinkific signup webhook received:', body);

    const payload = body?.payload || body;
    const email = payload?.email?.trim();
    const firstName = payload?.first_name || null;
    const lastName = payload?.last_name || null;

    if (!email) {
      return res.status(400).json({ error: 'Missing email in webhook payload' });
    }

    const action = String(body?.action || payload?.action || '').toLowerCase();
    const resource = String(
      body?.resource || payload?.resource || ''
    ).toLowerCase();

    if (
      (action && action !== 'signup') ||
      (resource && resource !== 'user')
    ) {
      return res.status(200).json({
        success: true,
        ignored: true,
        reason: `Ignored webhook ${resource || 'unknown'}.${action || 'unknown'}`,
      });
    }

    // Same AC form path as the site footer subscribe module.
    const mailingList = await subscribeToMailingList({
      email,
      firstName,
      lastName,
      source: 'thinkific',
    });

    // Same Amplify EmailSubscription record the footer writes after AC submit.
    let subscription = null;
    try {
      const result = await API.graphql({
        query: createEmailSubscription,
        variables: {
          input: {
            email,
            page: 'thinkific',
            device: 'thinkific_webhook',
          },
        },
      });
      subscription = result?.data?.createEmailSubscription || null;
    } catch (error) {
      // Don't fail the webhook if Dynamo logging fails after a successful AC subscribe.
      console.warn(
        'Failed to record EmailSubscription for Thinkific signup:',
        error?.message || error
      );
    }

    console.log(
      `Subscribed ${email} via AC form ${mailingList.formId} (source: ${mailingList.source})`
    );

    return res.status(200).json({
      success: true,
      mailingList,
      subscriptionId: subscription?.id || null,
    });
  } catch (error) {
    console.error('Error handling Thinkific signup webhook:', error);
    return res.status(500).json({
      error: 'Failed to process Thinkific signup webhook',
      message: error.message,
    });
  }
}
