const PERSONAL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'gmx.com',
  'gmx.net',
  'mail.com',
  'yandex.com',
  'zoho.com',
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isWorkEmailRequired = () => {
  if (process.env.NEXT_PUBLIC_ND_ALLOW_PERSONAL_EMAILS === 'true') {
    return false;
  }
  if (process.env.NEXT_PUBLIC_ND_REQUIRE_WORK_EMAIL === 'true') {
    return true;
  }
  return process.env.NODE_ENV === 'production';
};

export const isWorkEmail = (value) => {
  const email = String(value || '')
    .trim()
    .toLowerCase();
  if (!EMAIL_PATTERN.test(email)) return false;
  if (!isWorkEmailRequired()) return true;
  const domain = email.split('@')[1];
  return Boolean(domain) && !PERSONAL_DOMAINS.has(domain);
};
