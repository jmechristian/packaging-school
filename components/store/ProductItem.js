import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/auth/authslice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [isProduct, setIsProduct] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        `/api/printful/get-product-by-id?id=${product.id}`
      );
      const data = await response.json();
      setIsProduct(data.data);
      // console.log(data.data);

      // Updated variant selection logic
      if (data.data?.sync_variants) {
        const mediumVariant = data.data.sync_variants.find(
          (v) => v.size === 'M'
        );
        const firstVariant = data.data.sync_variants[0];
        const defaultVariant = mediumVariant || firstVariant;
        setSelectedVariant(defaultVariant);
      }
    };
    getProduct();
  }, [product]);

  return (
    <div className='container flex flex-col gap-5'>
      {/* Square div on top */}
      <div
        className='bg-contain bg-center bg-no-repeat border border-gray-400'
        style={{
          aspectRatio: '3/4',
          backgroundImage: `url(${product.thumbnail_url})`,
        }}
      >
        {/* You can add content here */}
      </div>

      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-1.5'>
          <div className=' font-semibold line-clamp-2 h-11 pr-4 overflow-hidden leading-tight'>
            {product.name}
          </div>
          <div className='text-sm text-neutral-500'>
            ${selectedVariant ? selectedVariant.retail_price : ''}
          </div>
        </div>
        <div className='flex w-full justify-center gap-2'>
          {isProduct && isProduct.sync_variants.length > 1 ? (
            <>
              <select
                className='bg-white border border-neutral-300 rounded-md px-2 py-2 text-sm w-1/3'
                onChange={(e) => {
                  const variant = isProduct.sync_variants.find(
                    (v) => v.id === parseInt(e.target.value)
                  );
                  setSelectedVariant(variant);
                }}
                value={selectedVariant?.id}
              >
                {isProduct.sync_variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.size || 'Default'}
                  </option>
                ))}
              </select>
              <button
                className='bg-neutral-300 text-neutral-700 hover:bg-neutral-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-md w-2/3 text-sm font-semibold'
                onClick={() => {
                  dispatch(addToCart({ ...selectedVariant, quantity: 1 }));
                }}
              >
                Add to Cart
              </button>
            </>
          ) : (
            <button
              className='bg-neutral-300 text-neutral-700 hover:bg-neutral-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-md w-full text-sm font-semibold'
              onClick={() => {
                dispatch(addToCart({ ...selectedVariant, quantity: 1 }));
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
