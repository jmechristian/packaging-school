import React, { useEffect, useState } from 'react';

import ProductItem from '../../../components/store/ProductItem';

const Page = () => {
  const [productTemplates, setProductTemplates] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/printful/get-products');
      const data = await response.json();
      setProductTemplates(data.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className='flex flex-col justify-center max-w-7xl mx-auto w-full gap-16 py-24'>
      <div className='flex flex-col justify-center gap-3'>
        <h1 className='text-4xl font-bold'>This is a Campus Store.</h1>
        <p className='text-lg text-gray-500'>Shop for all your campus needs.</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16'>
        {productTemplates.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Page;
