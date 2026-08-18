import { Button, Link, Section, Text } from '@react-email/components';
import * as React from 'react';
import {
  CourseCallout,
  LibraryEmailShell,
  libraryEmailStyles,
} from './library-email-shell';

export type LibraryEnrollmentApprovedEmailProps = {
  requesterName?: string;
  courseName?: string;
  courseImage?: string;
  dashboardUrl?: string;
  courseUrl?: string;
};

export const LibraryEnrollmentApprovedEmail = ({
  requesterName = 'there',
  courseName = 'your selected course',
  dashboardUrl = 'https://packagingschool.com/profile?tab=courses',
  courseUrl = 'https://packagingschool.com/network-distribution',
}: LibraryEnrollmentApprovedEmailProps) => (
  <LibraryEmailShell
    preview={`You are enrolled in ${courseName}`}
    title='You are enrolled'
  >
    <Section style={libraryEmailStyles.content}>
      <Text style={libraryEmailStyles.paragraph}>
        Hi {requesterName}, your sales leader approved your enrollment request.
        The course is now available on your Learning Dashboard.
      </Text>
      <CourseCallout name={courseName} />
      <Section style={{ marginBottom: '8px' }}>
        <Button href={dashboardUrl} style={libraryEmailStyles.primaryButton}>
          Open Learning Dashboard
        </Button>
      </Section>
      {courseUrl ? (
        <Text style={libraryEmailStyles.footerText}>
          Or go directly to{' '}
          <Link href={courseUrl} style={libraryEmailStyles.link}>
            {courseName}
          </Link>
          .
        </Text>
      ) : null}
    </Section>
  </LibraryEmailShell>
);

LibraryEnrollmentApprovedEmail.PreviewProps = {
  requesterName: 'Alex Rivera',
  courseName: 'Certificate of Packaging Science Bundle',
} as LibraryEnrollmentApprovedEmailProps;

export default LibraryEnrollmentApprovedEmail;
