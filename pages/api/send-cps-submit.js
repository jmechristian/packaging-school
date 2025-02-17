import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
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

  var myVar =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
    '<html dir="ltr" lang="en">' +
    '  <head>' +
    '   <link rel="preload" as="image" href="https://packschool.s3.amazonaws.com/email-logo.png" />' +
    '   <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />' +
    '   <title>CPS Application Submission</title>' +
    ' </head>' +
    '  <body style="background-color:rgb(212,212,212);font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">' +
    '   <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;background-color:rgb(255,255,255);width:600px;margin-top:2rem;margin-bottom:2rem;">' +
    '     <tbody>' +
    '       <tr style="width:100%">' +
    '         <td>' +
    '           <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:rgb(23,23,23);padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem;">' +
    '             <tbody>' +
    '               <tr>' +
    '                 <td>' +
    '                   <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">' +
    '                     <tbody style="width:100%">' +
    '                       <tr style="width:100%">' +
    '                         <td data-id="__react-email-column">' +
    '                           <p style="font-size:1.125rem;line-height:1.25;margin:16px 0;font-weight:700;color:rgb(255,255,255)">CPS Application Submission</p>' +
    '                         </td>' +
    '                         <td align="right" data-id="__react-email-column"><img height="50" src="https://packschool.s3.amazonaws.com/email-logo.png" style="display:block;outline:none;border:none;text-decoration:none" /></td>' +
    '                       </tr>' +
    '                     </tbody>' +
    '                   </table>' +
    '                 </td>' +
    '               </tr>' +
    '             </tbody>' +
    '           </table>' +
    '           <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:rgb(255,255,255);padding:1rem">' +
    '             <tbody>' +
    '               <tr>' +
    '                 <td>' +
    '                   <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">' +
    '                     <tbody style="width:100%">' +
    '                       <tr style="width:100%">' +
    '                         <td data-id="__react-email-column">' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">First Name</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.firstName}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Last Name</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.lastName}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Email</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.email}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Phone Number</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.phone}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Street Address</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.streetAddress}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Address Line 2</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.extraAddress}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">City</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.city}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">State/ Province/ Region</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.state}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Country</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.country}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Year of Birth</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.birthYear}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Company Name</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.companyName}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Company Title</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.companyTitle}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">LinkedIn Profile</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.linkedIn}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Your Background</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.background}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Why did you get into packaging?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.whyPackaging}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">What is your main area of interest?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.areaOfInterest}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">What goals do you have for yourself in the next 12 months?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.yearGoals}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">How do you see The Certificate of Packaging Science helping you achieve those goals?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.cpsGoals}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">We know written applications can only capture so much. As we review your application, what more would you like us to know?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.moreAboutYou}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Elective</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.elective}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Where did you hear about the Certificate of Packaging Science?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.referral}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">How will you be paying for this program?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.payment}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Payment Type?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.paymentType}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Payment Confirmation</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.paymentConfirmation}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                         </td>' +
    '                       </tr>' +
    '                     </tbody>' +
    '                   </table>' +
    '                 </td>' +
    '               </tr>' +
    '             </tbody>' +
    '           </table>' +
    '         </td>' +
    '       </tr>' +
    '     </tbody>' +
    '   </table>' +
    ' </body>' +
    '</html>';

  const createSendEmailCommand = (toAddress, fromAddress) => {
    return new SendEmailCommand({
      Destination: {
        /* required */
        CcAddresses: [
          /* more items */
        ],
        ToAddresses: [toAddress, 'info@packagingschool.com'],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Data: myVar,
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'TEXT_FORMAT_BODY',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${body.form} Application Submit`,
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
        'jamie@packagingschool.com'
      )
    );
    return res.status(200).json({ message: 'Success' + res });
  } catch (error) {
    console.log(error);
    return res.status(410).json({ message: error + 'error' });
  }
}
