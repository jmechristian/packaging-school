import { API } from 'aws-amplify';
import * as queries from '../../src/graphql/queries';

export default async function CreateUser(req, res) {
  const params = {
    email: req.body,
  };

  if (req.method === 'POST') {
    const isUser = await API.graphql({
      query: queries.usersByEmail,
      variables: { email: req.body },
    });
    if (isUser.data.usersByEmail.items.length != 0) {
      res.status(201);
      return res.json({ user: isUser.data.usersByEmail.items[0] });
    } else {
      console.log('Creating user');
      res.status(202);
      res.json({ message: 'No User Found' });
    }
  } else {
    res.status(402);
    res.json({ message: 'Wrong method.' });
  }
}

// export default function handler(req, res) {
//   res.status(200).json({ message: req.body.email });
// }
