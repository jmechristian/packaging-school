export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.query;

  const query = `
    query UserByEmail($email: EmailAddress!, $first: Int) {
      userByEmail(email: $email) {
        courses(first: $first) {
          nodes {
            id
            name
            title
            slug
            instructor {
              fullName
            }
            cardImage {
              url
            }
            product {
              primaryPrice {
                price
                displayPrice
              }
            }
          }
        }
        firstName
        lastName
        email
        id
      }
    }
  `;

  return fetch('https://api.thinkific.com/stable/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_THINKIFIC_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        email,
        first: 100,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => res.status(200).json({ message: 'success', data }))
    .catch((error) =>
      res.status(500).json({ message: 'error', error: error.message })
    );
}
