import { Button, Link, Section, Text } from '@react-email/components';
import * as React from 'react';
import {
  CourseCallout,
  LibraryEmailShell,
  libraryEmailStyles,
} from './library-email-shell';

export type LibraryEnrollmentRequestEmailProps = {
  requesterName?: string;
  requesterEmail?: string;
  courseName?: string;
  courseImage?: string;
  approveUrl?: string;
  declineUrl?: string;
  dashboardUrl?: string;
};

export const LibraryEnrollmentRequestEmail = ({
  requesterName = 'A Network Distribution teammate',
  requesterEmail = 'learner@example.com',
  courseName = 'Certificate of Packaging Science',
  approveUrl = 'https://packagingschool.com',
  declineUrl = 'https://packagingschool.com',
  dashboardUrl = 'https://packagingschool.com/network-distribution/approvals',
}: LibraryEnrollmentRequestEmailProps) => (
  <LibraryEmailShell
    preview={`${requesterName} requested approval to enroll in ${courseName}`}
    title='Enrollment approval requested'
  >
    <Section style={libraryEmailStyles.content}>
      <Text style={libraryEmailStyles.paragraph}>
        {requesterName} ({requesterEmail}) confirmed they have your approval and
        requested enrollment in the course below.
      </Text>
      <CourseCallout name={courseName} />
      <Text style={libraryEmailStyles.paragraph}>
        Approve to process their enrollment, or decline if this request should
        not move forward.
      </Text>
      <Section style={{ marginBottom: '8px' }}>
        <Button href={approveUrl} style={libraryEmailStyles.primaryButton}>
          Approve enrollment
        </Button>
      </Section>
      <Section>
        <Button href={declineUrl} style={libraryEmailStyles.secondaryButton}>
          Decline request
        </Button>
      </Section>
      <Text style={libraryEmailStyles.footerText}>
        You can also review open requests on your{' '}
        <Link href={dashboardUrl} style={libraryEmailStyles.link}>
          sales leader dashboard
        </Link>
        .
      </Text>
    </Section>
  </LibraryEmailShell>
);

LibraryEnrollmentRequestEmail.PreviewProps = {
  requesterName: 'Alex Rivera',
  requesterEmail: 'alex@networkdistribution.com',
  courseName: 'Certificate of Packaging Science Bundle',
} as LibraryEnrollmentRequestEmailProps;

export default LibraryEnrollmentRequestEmail;
