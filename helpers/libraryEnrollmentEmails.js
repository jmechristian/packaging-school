import React from 'react';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { render } from '@react-email/render';
import LibraryEnrollmentRequestEmail from '../react-email-starter/emails/library-enrollment-request';
import LibraryEnrollmentApprovedEmail from '../react-email-starter/emails/library-enrollment-approved';
import LibraryEnrollmentDeclinedEmail from '../react-email-starter/emails/library-enrollment-declined';

const sesClient = new SESClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWSACCESSKEYID,
    secretAccessKey: process.env.AWSSECRETACCESSKEY,
  },
});

const FROM = 'info@packagingschool.com';

const sendSesEmail = async ({ to, subject, html, bcc = [] }) => {
  const destination = {
    ToAddresses: Array.isArray(to) ? to : [to],
  };
  if (bcc.length) {
    destination.BccAddresses = bcc;
  }

  const command = new SendEmailCommand({
    Destination: destination,
    Message: {
      Body: {
        Html: { Data: html },
        Text: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Subject: { Charset: 'UTF-8', Data: subject },
    },
    Source: FROM,
    ReplyToAddresses: [FROM],
  });

  await sesClient.send(command);
};

export const sendLibraryEnrollmentRequestEmail = async ({
  to,
  requesterName,
  requesterEmail,
  courseName,
  courseImage,
  approveUrl,
  declineUrl,
  dashboardUrl,
}) => {
  const html = render(
    <LibraryEnrollmentRequestEmail
      requesterName={requesterName}
      requesterEmail={requesterEmail}
      courseName={courseName}
      courseImage={courseImage}
      approveUrl={approveUrl}
      declineUrl={declineUrl}
      dashboardUrl={dashboardUrl}
    />,
  );

  await sendSesEmail({
    to,
    bcc: ['info@packagingschool.com'],
    subject: `Enrollment approval needed: ${courseName}`,
    html,
  });
};

export const sendLibraryEnrollmentApprovedEmail = async ({
  to,
  requesterName,
  courseName,
  courseImage,
  dashboardUrl,
  courseUrl,
}) => {
  const html = render(
    <LibraryEnrollmentApprovedEmail
      requesterName={requesterName}
      courseName={courseName}
      courseImage={courseImage}
      dashboardUrl={dashboardUrl}
      courseUrl={courseUrl}
    />,
  );

  await sendSesEmail({
    to,
    subject: `You are enrolled in ${courseName}`,
    html,
  });
};

export const sendLibraryEnrollmentDeclinedEmail = async ({
  to,
  requesterName,
  courseName,
  catalogUrl,
  declineReason,
}) => {
  const html = render(
    <LibraryEnrollmentDeclinedEmail
      requesterName={requesterName}
      courseName={courseName}
      catalogUrl={catalogUrl}
      declineReason={declineReason}
    />,
  );

  await sendSesEmail({
    to,
    subject: `Enrollment request declined: ${courseName}`,
    html,
  });
};

export const renderLibraryEnrollmentEmail = (template, props = {}) => {
  if (template === 'request') {
    return {
      subject: `Enrollment approval needed: ${props.courseName || 'course'}`,
      html: render(<LibraryEnrollmentRequestEmail {...props} />),
    };
  }
  if (template === 'approved') {
    return {
      subject: `You are enrolled in ${props.courseName || 'your selected course'}`,
      html: render(<LibraryEnrollmentApprovedEmail {...props} />),
    };
  }
  if (template === 'declined') {
    return {
      subject: `Enrollment request declined: ${props.courseName || 'course'}`,
      html: render(<LibraryEnrollmentDeclinedEmail {...props} />),
    };
  }
  throw new Error(`Unknown email template: ${template}`);
};

export const sendLibraryEnrollmentTestEmail = async ({
  to,
  template,
  props,
}) => {
  const { subject, html } = renderLibraryEnrollmentEmail(template, props);
  await sendSesEmail({ to, subject: `[TEST] ${subject}`, html });
};
