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
    '   <title>ICPF CMPM Application Submission</title>' +
    ' </head>' +
    '  <body style="background-color:rgb(212,212,212);font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">' +
    '   <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;background-color:rgb(255,255,255);width:600px">' +
    '     <tbody>' +
    '       <tr style="width:100%">' +
    '         <td>' +
    '           <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:rgb(23,23,23);padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem">' +
    '             <tbody>' +
    '               <tr>' +
    '                 <td>' +
    '                   <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">' +
    '                     <tbody style="width:100%">' +
    '                       <tr style="width:100%">' +
    '                         <td data-id="__react-email-column">' +
    '                           <p style="font-size:1.125rem;line-height:1.25;margin:16px 0;font-weight:700;color:rgb(255,255,255)">CMPM ICPF Application Submission</p>' +
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
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Age</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.age}</p>` +
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
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">School</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.school}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">School Type</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.schoolType}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">What is your current area of study or program focus?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.studying}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Credential or degree</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.credential}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">What year are you in your program?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.credentialProgress}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Year of graduation</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.credentialYear}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Are you attending full-time or part-time?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.fullTime}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Are you involved in any student organizations, internships, or related experiences?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.organizations}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Upload your transcript</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.transcript}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Upload your resume</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.resume}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">LinkedIn Profile</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.linkedin}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Explain why you are interested in a career in the packaging or supply chain industry. How do you see the CMPM program helping you achieve your goals, and what impact do you hope to make in the corrugated packaging sector?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.yearGoals}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">How do you see the CMPM program helping you achieve your academic or career goals?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.cmpmGoals}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">What kind of impact does the corrugated packaging industry have on the global marketplace, and why does this field matter to you?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.moreAboutYou}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Are you open to internship or job opportunities with ICPF partner companies after completing your program?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.opportunities}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">I understand that I may be contacted for an informational interview during the review period.</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.contactConsent}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Session Applying</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.sessionApplying}</p>` +
    '                           <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />' +
    '                           <p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:700">Where did you hear about the Certificate of Mastery in Packaging Management?</p>' +
    `                           <p style="font-size:14px;line-height:24px;margin:16px 0">${body.referral}</p>` +
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
        ToAddresses: [
          toAddress,
          'info@packagingschool.com',
          // 'csalaverria@icpfbox.org',
          // 'vmiksis@icpfbox.org',
          // 'alemoine@icpfbox.org',
        ],
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
          Data: `${body.form} ICPF Application Submit`,
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
