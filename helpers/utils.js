export const setTextColor = (cat) => {
  switch (cat) {
    case 'Materials':
      return 'bg-base-dark text-white';
    case 'MATERIALS':
      return 'bg-base-dark text-white';
    case 'Industry':
      return 'bg-base-brand';
    case 'INDUSTRY':
      return 'bg-base-brand text-white';
    case 'Design':
      return 'bg-clemson';
    case 'DESIGN':
      return 'bg-clemson';
    case 'FOODANDBEVERAGE':
      return 'bg-indigo-400 text-neutral-900';
    case 'Food & Beverage':
      return 'bg-indigo-400 text-neutral-900';
    case 'Supply Chain & Logistics':
      return 'bg-clemson-dark text-white';
    case 'SUPPLYCHAIN':
      return 'bg-clemson-dark text-white';
    case 'Business':
      return 'bg-green-600';
    case 'BUSINESS':
      return 'bg-green-600';
    case 'AUTO':
      return 'bg-brand-yellow text-neutral-900';
    case 'Automotive':
      return 'bg-brand-yellow text-neutral-900';
    case 'Explore All Courses':
      return 'bg-black text-neutral-900';
  }
};

export const setCategoryText = (cat) => {
  switch (cat) {
    case 'Materials':
      return 'Materials';
    case 'MATERIALS':
      return 'Materials';
    case 'Industry':
      return 'Industry';
    case 'INDUSTRY':
      return 'Industry';
    case 'Design':
      return 'Design';
    case 'DESIGN':
      return 'Design';
    case 'FOODANDBEVERAGE':
      return 'Food & Beverage';
    case 'Food & Beverage':
      return 'Food & Beverage';
    case 'Supply Chain & Logistics':
      return 'Supply Chain & Logistics';
    case 'SUPPLYCHAIN':
      return 'Supply Chain & Logistics';
    case 'Business':
      return 'Business';
    case 'BUSINESS':
      return 'Business';
    case 'AUTO':
      return 'Automotive';
  }
};

// Active Campaign

const userOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'Api-Token':
      '5b711970d216e0f86172aa745b874bcd8ab60f27e791dce12137beb0533c3cd6618d1021',
  },
};

const dealsOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Api-Token':
      '5b711970d216e0f86172aa745b874bcd8ab60f27e791dce12137beb0533c3cd6618d1021',
  },
  body: JSON.stringify({
    deal: {
      status: 0,
      title: 'CMPM Abandon App',
      group: '16',
      stage: '113',
      contact: '16610',
      value: 10000,
      owner: '10',
      currency: 'usd',
    },
  }),
};

const createOptions = {
  method: 'POST',
  headers: { accept: 'application/json', 'content-type': 'application/json' },
  body: JSON.stringify({
    contact: {
      email: 'jmechristian@gmail.com',
      firstName: 'Jamie',
      lastName: 'Christian',
      phone: '5122893696',
    },
  }),
};

export const createUser = async (email, firstName, lastName, phone) => {
  const user = await fetch(
    'https://packagingschool42200.api-us1.com/api/3/contacts',
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Api-Token':
          '5b711970d216e0f86172aa745b874bcd8ab60f27e791dce12137beb0533c3cd6618d1021',
      },
      body: JSON.stringify({
        contact: {
          email,
          firstName,
          lastName,
          phone,
        },
      }),
    }
  )
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });

  return user;
};

export const getUser = async (email) => {
  const user = await fetch(
    `https://packagingschool42200.api-us1.com/api/3/contacts?email=${email}`,
    userOptions
  )
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });

  return user;
};

export const createDeal = async (contact, formType) => {
  const deal = await fetch(
    `https://packagingschool42200.api-us1.com/api/3/deals`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Api-Token':
          '5b711970d216e0f86172aa745b874bcd8ab60f27e791dce12137beb0533c3cd6618d1021',
      },
      body: JSON.stringify({
        deal: {
          status: 0,
          title: `${formType} Abandoned App`,
          group: '16',
          stage: '113',
          contact: contact,
          owner: '10',
          value: 10000,
          currency: 'usd',
        },
      }),
    }
  )
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });

  return deal;
};

export const updateDeal = async (id, formType) => {
  const deal = await fetch(
    `https://packagingschool42200.api-us1.com/api/3/deals/${id}`,
    {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Api-Token':
          '5b711970d216e0f86172aa745b874bcd8ab60f27e791dce12137beb0533c3cd6618d1021',
      },
      body: JSON.stringify({
        deal: {
          stage: formType === 'CMPM' ? '139' : '140',
        },
      }),
    }
  )
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });

  return deal;
};
