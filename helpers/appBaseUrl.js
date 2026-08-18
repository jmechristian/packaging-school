export const PRODUCTION_APP_URL = 'https://packagingschool.com';

export const getAppBaseUrl = () => {
  const override = (
    process.env.NEXT_PUBLIC_ND_APP_URL ||
    process.env.ND_APP_URL ||
    ''
  ).replace(/\/$/, '');

  if (override && !/localhost|127\.0\.0\.1/i.test(override)) {
    return override;
  }

  return PRODUCTION_APP_URL;
};
