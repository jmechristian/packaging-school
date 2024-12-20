import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const CartToggle = ({ items }) => {
  const router = useRouter();
  const { cart } = useSelector((state) => state.auth);
  return (
    <motion.div
      className='fixed z-50 right-3 md:right-5 bottom-5 md:bottom-20'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className='bg-green-500 dark:bg-green-600 border border-green-600 rounded-full w-9 h-9 md:w-12 md:h-12 flex justify-center items-center shadow-xl relative'
        onClick={() => {
          router.push(`/dev/store/cart/${cart.id}`);
        }}
      >
        <div>
          <ShoppingCartIcon className='h-6 w-6 stroke-black' />
        </div>
        {items.length > 0 && (
          <div className='absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-2 py-1'>
            {items.length}
          </div>
        )}
      </button>
    </motion.div>
  );
};

export default CartToggle;
