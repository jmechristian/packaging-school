import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

const navy = '#0A1D3A';
const gold = '#f4aa00';
const muted = '#64748b';
const bodyText = '#334155';
const pageBg = '#f4f4f5';

export const libraryEmailStyles = {
  main: {
    backgroundColor: pageBg,
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif',
    margin: 0,
    padding: '32px 12px',
  },
  container: {
    backgroundColor: '#ffffff',
    maxWidth: '560px',
    margin: '0 auto',
    borderRadius: '8px',
    overflow: 'hidden' as const,
    border: '1px solid #e2e8f0',
  },
  header: {
    backgroundColor: navy,
    padding: '28px 32px 24px',
  },
  eyebrow: {
    color: gold,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.16em',
    textTransform: 'uppercase' as const,
    margin: '0 0 8px',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: 600,
    lineHeight: '1.3',
    margin: 0,
  },
  content: {
    padding: '28px 32px 8px',
  },
  paragraph: {
    color: bodyText,
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 16px',
  },
  courseBlock: {
    backgroundColor: '#f8fafc',
    borderLeft: `3px solid ${gold}`,
    padding: '14px 16px',
    margin: '8px 0 24px',
  },
  courseLabel: {
    color: muted,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    margin: '0 0 4px',
  },
  courseName: {
    color: navy,
    fontSize: '17px',
    fontWeight: 600,
    lineHeight: '1.4',
    margin: 0,
  },
  primaryButton: {
    backgroundColor: navy,
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    padding: '12px 22px',
    borderRadius: '6px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    color: navy,
    fontSize: '14px',
    fontWeight: 600,
    padding: '11px 22px',
    borderRadius: '6px',
    textDecoration: 'none',
    display: 'inline-block',
    border: `1px solid ${navy}`,
  },
  footer: {
    padding: '8px 32px 28px',
  },
  footerText: {
    color: muted,
    fontSize: '13px',
    lineHeight: '1.5',
    margin: '16px 0 0',
  },
  link: {
    color: navy,
    textDecoration: 'underline',
  },
};

export const LibraryEmailShell = ({
  preview,
  title,
  children,
}: {
  preview: string;
  title: string;
  children: React.ReactNode;
}) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={libraryEmailStyles.main}>
      <Container style={libraryEmailStyles.container}>
        <Section style={libraryEmailStyles.header}>
          <Text style={libraryEmailStyles.eyebrow}>
            Network Distribution Library
          </Text>
          <Text style={libraryEmailStyles.headerTitle}>{title}</Text>
        </Section>
        {children}
        <Section style={libraryEmailStyles.footer}>
          <Hr style={{ borderColor: '#e2e8f0', margin: '8px 0 0' }} />
          <Text style={libraryEmailStyles.footerText}>
            Questions? Email{' '}
            <Link
              href='mailto:info@packagingschool.com'
              style={libraryEmailStyles.link}
            >
              info@packagingschool.com
            </Link>
            .
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const CourseCallout = ({ name }: { name: string }) => (
  <Section style={libraryEmailStyles.courseBlock}>
    <Text style={libraryEmailStyles.courseLabel}>Course</Text>
    <Text style={libraryEmailStyles.courseName}>{name}</Text>
  </Section>
);
