const REGISTRANT_QUERY = `
  query ApsRegistrantsByEmail($email: String!, $nextToken: String) {
    apsRegistrantsByEmail(email: $email, limit: 25, nextToken: $nextToken) {
      items {
        firstName
        lastName
        status
        aps {
          year
        }
      }
      nextToken
    }
  }
`;

const normalize = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

async function registrantsForEmail(email) {
  const url = process.env.APS_SUMMIT_GRAPHQL_URL;
  const apiKey = process.env.APS_SUMMIT_API_KEY;
  if (!url || !apiKey) {
    throw new Error('Summit registration lookup is not configured');
  }

  const items = [];
  let nextToken;

  do {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        query: REGISTRANT_QUERY,
        variables: { email, nextToken },
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.errors) {
      throw new Error(payload.errors?.[0]?.message || 'Registration lookup failed');
    }
    const page = payload.data?.apsRegistrantsByEmail;
    items.push(...(page?.items || []).filter(Boolean));
    nextToken = page?.nextToken;
  } while (nextToken);

  return items;
}

export async function isApprovedAps2026Registrant({ email, firstName, lastName }) {
  const items = await registrantsForEmail(email.trim().toLowerCase());
  const first = normalize(firstName);
  const last = normalize(lastName);

  return items.some(
    (item) =>
      item.status === 'APPROVED' &&
      String(item.aps?.year) === '2026' &&
      normalize(item.firstName) === first &&
      normalize(item.lastName) === last,
  );
}
