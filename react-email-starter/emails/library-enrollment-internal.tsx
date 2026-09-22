import { Section, Text } from '@react-email/components';
import * as React from 'react';
import {
  CourseCallout,
  DetailRow,
  LibraryEmailShell,
  libraryEmailStyles,
} from './library-email-shell';

export type LibraryEnrollmentInternalEmailProps = {
  salesLeaderName?: string;
  salesLeaderEmail?: string;
  studentName?: string;
  studentEmail?: string;
  courseName?: string;
  courseId?: string;
  couponCode?: string;
  couponUsed?: number | string | null;
  couponQuantity?: number | string | null;
};

const formatPerson = (name?: string, email?: string) => {
  if (name && email) return `${name} (${email})`;
  return name || email || '—';
};

const formatRemaining = (
  used?: number | string | null,
  quantity?: number | string | null,
) => {
  const usedCount = Number(used);
  const total = Number(quantity);
  if (Number.isFinite(total) && total >= 0) {
    const remaining = Math.max(0, total - (Number.isFinite(usedCount) ? usedCount : 0));
    const usedLabel = Number.isFinite(usedCount) ? usedCount : 0;
    return `${remaining} remaining (${usedLabel} of ${total} used)`;
  }
  if (Number.isFinite(usedCount)) return `${usedCount} used`;
  return 'Unavailable';
};

export const LibraryEnrollmentInternalEmail = ({
  salesLeaderName = 'Sales leader',
  salesLeaderEmail = 'leader@example.com',
  studentName = 'Student',
  studentEmail = 'student@example.com',
  courseName = 'Network Distribution course',
  courseId,
  couponCode = 'networklibrary',
  couponUsed = 1,
  couponQuantity = 100,
}: LibraryEnrollmentInternalEmailProps) => {
  const purchased = courseId ? `${courseId} — ${courseName}` : courseName;

  return (
    <LibraryEmailShell
      preview={`${studentName} enrolled in ${courseName}`}
      title='Enrollment recorded'
    >
      <Section style={libraryEmailStyles.content}>
        <Text style={libraryEmailStyles.paragraph}>
          A Network Distribution enrollment was approved and a coupon was used.
        </Text>
        <CourseCallout name={purchased} />
        <DetailRow
          label='Sales leader'
          value={formatPerson(salesLeaderName, salesLeaderEmail)}
        />
        <DetailRow
          label='Student'
          value={formatPerson(studentName, studentEmail)}
        />
        <DetailRow label='Coupon' value={couponCode} />
        <DetailRow
          label='Coupons remaining'
          value={formatRemaining(couponUsed, couponQuantity)}
        />
      </Section>
    </LibraryEmailShell>
  );
};

LibraryEnrollmentInternalEmail.PreviewProps = {
  salesLeaderName: 'Jordan Lee',
  salesLeaderEmail: 'jordan@networkdistribution.com',
  studentName: 'Alex Rivera',
  studentEmail: 'alex@networkdistribution.com',
  courseName: 'Certificate of Packaging Science Bundle',
  courseId: 'CPS-00',
  couponCode: 'networklibrary',
  couponUsed: 1,
  couponQuantity: 100,
} as LibraryEnrollmentInternalEmailProps;

export default LibraryEnrollmentInternalEmail;
