// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { email } = req.body;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Api-Token': process.env.ACTIVECAMPAIN_API_KEY,
    },
  };

  const RemoveFromList = async (contact) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Api-Token': process.env.ACTIVECAMPAIN_API_KEY,
      },
      body: JSON.stringify({
        contactList: {
          list: 73,
          contact: contact,
          status: 2,
        },
      }),
    };
    await fetch(
      'https://packagingschool42200.api-us1.com/api/3/contactLists',
      options
    ).then((response) =>
      response
        .json()
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
    );
  };

  const isUser = await fetch(
    `https://packagingschool42200.api-us1.com/api/3/contacts?email=${email}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.contacts.length > 0) {
        RemoveFromList(response.contacts[0].id);

        return res.status(200).json({
          message: `User ${email} removed from list`,
        });
      } else {
        return res.status(200).json({
          message: `Error removing ${email} from list`,
        });
      }
    })
    .catch((err) => console.error(err));

  return isUser;
}
