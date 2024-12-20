import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  removeFromCart,
  updateCartItemQuantity,
} from '../../../../features/auth/authslice';
const CartPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id !== cart.id) {
      router.push('/store');
    }
  }, [router.query, id, cart.id, router]);

  return (
    <div className='w-full max-w-7xl mx-auto px-4 lg:px-0 py-10 lg:py-20'>
      <div className='grid lg:grid-cols-5 gap-10 border border-gray-200 rounded-lg p-4'>
        <div className='flex flex-col gap-4 lg:col-span-3'>
          {cart.items.length === 0 ? (
            <div className='flex flex-col items-center justify-center gap-4 py-20'>
              <h4 className='h4-base text-gray-700'>Your Cart is Empty</h4>
              <button
                onClick={() => router.push('/store')}
                className='bg-base-brand hover:bg-base-dark transition-all duration-300 text-white px-6 py-3 rounded-md font-semibold'
              >
                Keep Shopping
              </button>
            </div>
          ) : (
            <div className='flex flex-col gap-5'>
              {cart.items.map((item) => (
                <div className='flex items-center gap-4' key={item.id}>
                  <div>
                    <div
                      className='w-40 h-40 bg-gray-200 rounded-lg bg-contain bg-center border border-gray-300'
                      style={{
                        backgroundImage: `url(${
                          item.files?.find((file) => file.type === 'preview')
                            ?.thumbnail_url ||
                          item.product?.image ||
                          '/fallback-image.jpg'
                        })`,
                      }}
                    ></div>
                  </div>
                  <div className='flex flex-col gap-2 w-full'>
                    <h4 className='font-semibold text-lg leading-tight max-w-lg'>
                      {item.name}
                    </h4>
                    <p className='p-base text-gray-500'>${item.retail_price}</p>
                  </div>
                  <div className='flex flex-col items-end gap-2 w-full'>
                    <select
                      className='border border-gray-300 rounded px-2 py-1 text-gray-500 w-16'
                      value={item.quantity || 1}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        dispatch(
                          updateCartItemQuantity({
                            id: item.id,
                            quantity: newQuantity,
                          })
                        );
                      }}
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className='text-red-500 text-sm'
                      onClick={() => {
                        dispatch(removeFromCart({ id: item.id }));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='relative w-full  lg:col-span-2 '>
          <div className=' sticky top-3 flex flex-col gap-4 p-4 rounded-lg w-full h-fit border border-gray-300'>
            <h4 className='h4-base pb-5 border-b border-gray-300'>Subtotal</h4>
            <p className='text-2xl font-semibold'>
              $
              {cart.items
                .reduce(
                  (total, item) => total + item.retail_price * item.quantity,
                  0
                )
                .toFixed(2)}
              <span className='text-xs text-gray-500 ml-1'>USD</span>
            </p>
            <button
              className='bg-base-brand hover:bg-base-dark transition-all duration-300 text-white px-4 py-3 rounded-md w-full font-semibold'
              onClick={() => {
                router.push(`/store/checkout/${cart.id}`);
              }}
            >
              Proceed to Checkout
            </button>
            <p
              className='text-sm text-gray-500 hover:text-base-brand transition-all duration-300 text-center cursor-pointer'
              onClick={() => {
                router.push('/store');
              }}
            >
              Continue Shopping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
