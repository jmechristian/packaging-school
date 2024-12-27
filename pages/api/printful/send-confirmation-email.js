import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { render } from '@react-email/render';
import StorePurchaseConfirmation from '../../../react-email-starter/emails/store-purchase-confirmation';

const REGION = 'us-east-1';
const creds = {
  accessKeyId: process.env.AWSACCESSKEYID,
  secretAccessKey: process.env.AWSSECRETACCESSKEY,
};
// Create SES service object.
const sesClient = new SESClient({ region: REGION, credentials: creds });
export { sesClient };

export default async function handler(req, res) {
  const body = req.body;
  const emailHtml = render(<StorePurchaseConfirmation data={body} />);

  const createSendEmailCommand = (toAddress, fromAddress) => {
    return new SendEmailCommand({
      Destination: {
        /* required */
        CcAddresses: [
          /* more items */
        ],
        BccAddresses: ['jamie@packagingschool.com', 'info@packagingschool.com'],
        ToAddresses: [body.data.email],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Data: emailHtml,
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'TEXT_FORMAT_BODY',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Packaging School Order Confirmation',
        },
      },
      Source: fromAddress,
      ReplyToAddresses: [
        /* more items */
      ],
    });
  };

  try {
    await sesClient.send(
      createSendEmailCommand(
        'jamie@packagingschool.com',
        'info@packagingschool.com'
      )
    );
    res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(410).json({ message: 'error' });
  }
}
