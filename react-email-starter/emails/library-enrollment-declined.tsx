import { Button, Section, Text } from '@react-email/components';
import * as React from 'react';
import {
  CourseCallout,
  LibraryEmailShell,
  libraryEmailStyles,
} from './library-email-shell';

export type LibraryEnrollmentDeclinedEmailProps = {
  requesterName?: string;
  courseName?: string;
  catalogUrl?: string;
  declineReason?: string;
};

export const LibraryEnrollmentDeclinedEmail = ({
  requesterName = 'there',
  courseName = 'your selected course',
  catalogUrl = 'https://packagingschool.com/network-distribution',
  declineReason,
}: LibraryEnrollmentDeclinedEmailProps) => (
  <LibraryEmailShell
    preview={`Enrollment request for ${courseName} was declined`}
    title='Enrollment request declined'
  >
    <Section style={libraryEmailStyles.content}>
      <Text style={libraryEmailStyles.paragraph}>
        Hi {requesterName}, your sales leader declined the enrollment request
        below.
      </Text>
      <CourseCallout name={courseName} />
      {declineReason ? (
        <Text style={libraryEmailStyles.paragraph}>
          Note from your sales leader: {declineReason}
        </Text>
      ) : null}
      <Text style={libraryEmailStyles.paragraph}>
        If this was a mistake, speak with your sales leader and submit a new
        request from the Network Distribution library.
      </Text>
      <Button href={catalogUrl} style={libraryEmailStyles.primaryButton}>
        Return to course library
      </Button>
    </Section>
  </LibraryEmailShell>
);

LibraryEnrollmentDeclinedEmail.PreviewProps = {
  requesterName: 'Alex Rivera',
  courseName: 'Certificate of Packaging Science Bundle',
  declineReason: 'Please enroll in the individual course instead of the bundle.',
} as LibraryEnrollmentDeclinedEmailProps;

export default LibraryEnrollmentDeclinedEmail;
