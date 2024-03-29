import { API } from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';

export default async function createUser(req, res) {
  const params = {
    email: req.body.email,
    name: req.body.name,
    picture: req.body.picture,
  };

  if (req.method === 'POST') {
    const isUser = await API.graphql({
      query: queries.usersByEmail,
      variables: { email: req.body.email },
    });
    if (isUser.data.usersByEmail.items.length != 0) {
      res.status(201);
    } else {
      await API.graphql({
        query: mutations.createUser,
        variables: { input: params },
      });
      res.status(201);
      res.json({ message: 'User Created' });
    }
  } else {
    res.status(402);
    res.json({ message: 'Wrong method.' });
  }
}

// export default function handler(req, res) {
//   res.status(200).json({ message: req.body.email });
// }
