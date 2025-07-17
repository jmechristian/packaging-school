import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import PurchaseLogin from '../../../components/login/PurchaseLogin';
import { getOrderByID } from '../../../helpers/api';

// Loading Skeleton Component
const OrderSkeleton = () => {
  return (
    <div className='fixed inset-0 bg-white z-50'>
      <div className='flex flex-col h-full'>
        <div className='flex-1 overflow-y-auto'>
          <div className='w-full pl-[53px] py-[13px] bg-black'>
            <div className='max-w-[15rem] h-auto max-h-[5rem] mb-[0.375rem]'>
              <Image
                src='https://packschool.s3.us-east-1.amazonaws.com/ps-logo-rectangle.png'
                alt='logo'
                width={1708}
                height={491}
              />
            </div>
          </div>
          <div className='w-full grid grid-cols-2'>
            <div className='w-full pr-[5.4%] flex justify-end pt-[80px]'>
              <div className='px-[53px] w-full flex justify-end'>
                <div className='w-full bg-white/50 h-full max-w-[454px]'>
                  {/* Course Image Skeleton */}
                  <div className='aspect-[16/9] w-full bg-gray-200 animate-pulse'></div>
                  <div className='w-full py-[1rem]'>
                    <div className='w-full flex flex-col gap-5'>
                      {/* Course Name Skeleton */}
                      <div className='h-8 bg-gray-200 animate-pulse rounded'></div>
                      {/* Course Description Skeleton */}
                      <div className='space-y-2'>
                        <div className='h-4 bg-gray-200 animate-pulse rounded'></div>
                        <div className='h-4 bg-gray-200 animate-pulse rounded w-3/4'></div>
                      </div>
                      {/* Price Items Skeleton */}
                      <div className='space-y-4'>
                        <div className='flex items-center justify-between'>
                          <div className='h-4 bg-gray-200 animate-pulse rounded w-24'></div>
                          <div className='h-4 bg-gray-200 animate-pulse rounded w-16'></div>
                        </div>
                        <div className='flex items-center justify-between'>
                          <div className='h-4 bg-gray-200 animate-pulse rounded w-16'></div>
                          <div className='h-4 bg-gray-200 animate-pulse rounded w-20'></div>
                        </div>
                      </div>
                      {/* Total Skeleton */}
                      <div className='py-5 border-y border-y-gray-300 flex items-center justify-between'>
                        <div className='h-4 bg-gray-200 animate-pulse rounded w-12'></div>
                        <div className='h-6 bg-gray-200 animate-pulse rounded w-24'></div>
                      </div>
                      {/* Help Text Skeleton */}
                      <div className='h-4 bg-gray-200 animate-pulse rounded'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full border-l border-l-gray-200'>
              <div className='w-full pl-[53px] bg-white h-full flex flex-col gap-6 pt-[80px] max-w-[454px]'>
                {/* Header Skeleton */}
                <div className='space-y-2'>
                  <div className='h-8 bg-gray-200 animate-pulse rounded'></div>
                  <div className='h-8 bg-gray-200 animate-pulse rounded w-3/4'></div>
                </div>
                {/* Login Form Skeleton */}
                <div className='space-y-4'>
                  <div className='h-12 bg-gray-200 animate-pulse rounded'></div>
                  <div className='h-12 bg-gray-200 animate-pulse rounded'></div>
                  <div className='h-12 bg-gray-200 animate-pulse rounded'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Order = (props) => {
  const { order } = props;
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Show loading for a minimum time to prevent flash
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while loading
  if (isLoading) {
    return <OrderSkeleton />;
  }

  // Show error state if no order data
  if (!order) {
    return (
      <div className='fixed inset-0 bg-white z-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-800 mb-4'>
            Order Not Found
          </h1>
          <p className='text-gray-600 mb-4'>
            The order you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <button
            onClick={() => router.push('/')}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-white z-50'>
      <div className='flex flex-col h-full'>
        <div className='flex-1 overflow-y-auto' id='scrollers'>
          <div className='w-full pl-[53px] py-[13px] bg-black'>
            <div className='max-w-[15rem] h-auto max-h-[5rem] mb-[0.375rem]'>
              <Image
                src='https://packschool.s3.us-east-1.amazonaws.com/ps-logo-rectangle.png'
                alt='logo'
                width={1708}
                height={491}
              />
            </div>
          </div>
          <div className='w-full grid lg:!grid-cols-2 '>
            <div className='w-full lg:!pr-[5.4%] flex justify-end pt-10 lg:!pt-[80px]'>
              <div className='px-[53px] w-full flex justify-end'>
                <div className='w-full bg-white/50 h-full max-w-[454px] mx-auto lg:!mx-0'>
                  <div
                    className='aspect-[16/9] w-full bg-black bg-cover bg-center bg-no-repeat'
                    style={{
                      backgroundImage: `url(${order.courseImage})`,
                    }}
                  ></div>
                  <div className='w-full py-[1rem]'>
                    <div className='w-full flex flex-col gap-5'>
                      <div className='font-raleway text-xl font-[700] text-[#36394d] leading-[40px]'>
                        {order.courseName}
                      </div>
                      <div className='line-clamp-2 font-raleway text-base text-[#36394d] leading-[22px]'>
                        {order.courseDescription}
                      </div>
                      {order.type === 'SUBSCRIPTION' ? (
                        <div className='font-raleway text-[#36394d] leading-[1.5] flex items-center justify-between'>
                          <div>Payment plan</div>
                          <div className='flex flex-col gap-0 items-end'>
                            <div className='font-raleway text-lg font-[600] text-[#36394d] leading-[1.5]'>
                              ${parseInt(order.total).toFixed(2)} /month
                            </div>
                            <div className='font-raleway text-[#36394d] leading-[1.5]'>
                              For 6 months
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className='font-raleway text-[#36394d] leading-[1.5] flex items-center justify-between'>
                          <div>One-time payment</div>
                          <div className='font-raleway text-lg font-[600] text-[#36394d] leading-[1.5]'>
                            ${parseInt(order.total).toFixed(2)}
                          </div>
                        </div>
                      )}
                      {order.courseDiscount > 0 && (
                        <div className='font-raleway text-[#36394d] leading-[1.5] flex items-center justify-between'>
                          <div>Coupon</div>
                          <div className='font-raleway text-lg font-[600] text-[#36394d] leading-[1.5]'>
                            -$
                            {parseInt(
                              (order.total * order.courseDiscount) / 100
                            ).toFixed(2)}
                          </div>
                        </div>
                      )}
                      <div className='py-5 border-y border-y-gray-300 font-raleway text-base text-[#36394d] leading-[1.5] flex items-center justify-between'>
                        <div>
                          Total{' '}
                          {order.type === 'SUBSCRIPTION' ? 'due today' : ''}
                        </div>
                        <div className='font-raleway text-2xl font-[600] text-[#36394d] leading-[1.5]'>
                          <span className='text-base font-[400] mr-2.5'>
                            USD
                          </span>
                          $
                          {parseInt(
                            order.total -
                              (order.total * order.courseDiscount) / 100
                          ).toFixed(2)}
                        </div>
                      </div>
                      <div className='w-full text-center font-raleway text-base text-[#36394d] leading-[1.5]'>
                        Need help placing your order?{' '}
                        <span className='underline cursor-pointer'>
                          Contact us
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full border-l border-l-gray-200'>
              <div className='w-full pl-10 pr-10 pb-10 lg:!pr-0 lg:!pl-[53px] bg-white h-full flex flex-col gap-6 pt-[80px] max-w-[454px] mx-auto lg:!mx-0'>
                <div className='font-raleway text-2xl font-[600] text-[#36394d] leading-[1.3]'>
                  Sign in or sign up to complete your purchase
                </div>
                <PurchaseLogin order={order} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { oid } = context.query;
  const order = await getOrderByID(oid);
  return { props: { order } };
}

export default Order;
