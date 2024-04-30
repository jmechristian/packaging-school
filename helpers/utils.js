import {
  MdExtension,
  MdDirectionsCar,
  MdBusinessCenter,
  MdColorLens,
  MdLunchDining,
  MdFactory,
  MdMiscellaneousServices,
  MdLocalShipping,
} from 'react-icons/md';

import { TiTree } from 'react-icons/ti';

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

export const baseCategoryColors = (cat) => {
  switch (cat) {
    case 'MATERIALS':
      return 'base-dark';
    case 'INDUSTRY':
      return 'brand-yellow';
    case 'DESIGN':
      return 'clemson';
    case 'FOODANDBEVERAGE':
      return 'brand-red';
    case 'AUTO':
      return 'blue-500';
    case 'SUPPLYCHAIN':
      return 'brand-red';
    case 'BUSINESS':
      return 'green-600';
    default:
      return 'clemson';
  }
};

export const setColorByCategory = (catArray) => {
  switch (catArray[0]) {
    case 'MATERIALS':
      return 'bg-base-brand';
    case 'INDUSTRY':
      return 'bg-brand-yellow';
    case 'DESIGN':
      return 'bg-clemson';
    case 'FOODANDBEVERAGE':
      return 'bg-brand-red';
    case 'AUTO':
      return 'bg-indigo-500';
    case 'SUPPLYCHAIN':
      return 'bg-clemson-dark';
    case 'BUSINESS':
      return 'bg-green-600';
    default:
      return 'bg-clemson';
  }
};

export const setCategoryIcon = (cat) => {
  switch (cat) {
    case 'MATERIALS':
      return (
        <div className='w-7 h-7 bg-base-dark rounded-full flex items-center justify-center'>
          <MdExtension color='white' size={18} />
        </div>
      );
    case 'INDUSTRY':
      return (
        <div className='w-7 h-7 bg-base-mid rounded-full flex items-center justify-center'>
          <MdFactory color='white' size={18} />
        </div>
      );
    case 'DESIGN':
      return (
        <div className='w-7 h-7 bg-clemson rounded-full flex items-center justify-center'>
          <MdColorLens color='white' size={18} />
        </div>
      );
    case 'FOODANDBEVERAGE':
      return (
        <div className='w-7 h-7 bg-indigo-400 rounded-full flex items-center justify-center'>
          <MdLunchDining color='white' size={18} />
        </div>
      );
    case 'SUPPLYCHAIN':
      return (
        <div className='w-7 h-7 bg-clemson-dark rounded-full flex items-center justify-center'>
          <MdLocalShipping color='white' size={18} />
        </div>
      );
    case 'BUSINESS':
      return (
        <div className='w-7 h-7 bg-green-600 rounded-full flex items-center justify-center'>
          <MdBusinessCenter color='white' size={18} />
        </div>
      );
    case 'AUTO':
      return (
        <div className='w-7 h-7 bg-red-600 rounded-full flex items-center justify-center'>
          <MdMiscellaneousServices color='white' size={18} />
        </div>
      );
    default:
      return (
        <div className='w-7 h-7 bg-base-dark rounded-full flex items-center justify-center'>
          <MdExtension color='white' size={18} />
        </div>
      );
  }
};

export const setCardIcon = (cat) => {
  switch (cat) {
    case 'MATERIALS':
      return (
        <div className='w-9 flex items-center justify-center aspect-[1/1] rounded-full bg-base-dark border border-black shadow-[2px_1px_0px_black]'>
          <div>
            <MdExtension color='white' size={20} />
          </div>
        </div>
      );
    case 'INDUSTRY':
      return (
        <div className='w-9 flex items-center justify-center aspect-[1/1] rounded-full bg-base-mid border border-black shadow-[2px_1px_0px_black]'>
          <div>
            <MdFactory color='white' size={20} />
          </div>
        </div>
      );
    case 'DESIGN':
      return (
        <div className='w-9 flex items-center justify-center aspect-[1/1] rounded-full bg-clemson border border-black shadow-[2px_1px_0px_black]'>
          <MdColorLens color='white' size={20} />
        </div>
      );
    case 'FOODANDBEVERAGE':
      return (
        <div className='w-9 flex items-center justify-center aspect-[1/1] rounded-full bg-indigo-400 border border-black shadow-[2px_1px_0px_black]'>
          <MdLunchDining color='white' size={20} />
        </div>
      );
    case 'SUPPLYCHAIN':
      return (
        <div className='w-9 flex items-center justify-center aspect-[1/1] rounded-full bg-clemson-dark border border-black shadow-[2px_1px_0px_black]'>
          <MdLocalShipping color='white' size={20} />
        </div>
      );
    case 'BUSINESS':
      return (
        <div className='w-9 flex items-center justify-center aspect-[1/1] rounded-full bg-green-600 border border-black shadow-[2px_1px_0px_black]'>
          <MdBusinessCenter color='white' size={20} />
        </div>
      );
    case 'AUTO':
      return (
        <div className='w-9 flex items-center justify-center aspect-[1/1] rounded-full bg-brand-red border border-black shadow-[2px_1px_0px_black]'>
          <MdMiscellaneousServices color='white' size={20} />
        </div>
      );
    default:
      return (
        <div className='w-9 flex items-center justify-center aspect-[1/1] rounded-full bg-base-dark border border-black shadow-[2px_1px_0px_black]'>
          <MdExtension color='white' size={20} />
        </div>
      );
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

export const createCMPMDeal = async (contact, title) => {
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
          title: title,
          group: '2',
          stage: '4',
          contact: contact,
          owner: '10',
          value: 700000,
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

export const createCSPDeal = async (contact, title) => {
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
          title: title,
          group: '16',
          stage: '147',
          contact: contact,
          owner: '10',
          value: 700000,
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
