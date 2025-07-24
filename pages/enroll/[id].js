import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createNewOrder, getCouponInfo, getProductId } from '../../helpers/api';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import { useSelector } from 'react-redux';

export default function Enroll({ product, couponInfo, orderId, redirectUrl }) {
  const [isLoading, setIsLoading] = useState(true);
  const [simProgress, setSimProgress] = useState(0);
  const router = useRouter();
  const { awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();

  // Simulate progress for better UX
  useEffect(() => {
    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 8 + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Handle redirect based on server-side data
  useEffect(() => {
    if (redirectUrl) {
      if (awsUser && awsUser.name.includes(' ')) {
        navigateToThinkific(redirectUrl, redirectUrl);
      } else {
        router.push(`/order/${orderId}`);
      }
    }
  }, [redirectUrl, orderId, awsUser, navigateToThinkific, router]);

  // Always show loader - redirect will handle the UI
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-dark dark:bg-black z-[9999] fixed top-0 left-0 w-full h-full'>
      <img src='/logos/logo-sq-wh.svg' alt='Logo' className='w-40 mb-6' />
      <div className='grid place-items-center'>
        <div role='status' className='col-start-1 row-start-1'>
          <svg
            aria-hidden='true'
            className='w-32 h-32 text-slate-800 animate-spin fill-clemson'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
        <div className='text-center text-sm text-slate-500 col-start-1 row-start-1'>
          {simProgress.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id, price_id, coupon, discount_code } = context.query;
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const host = context.req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  try {
    console.log('Server-side enrollment processing:', {
      id,
      price_id,
      coupon,
      discount_code,
    });

    // 1. Fetch product
    const product = await getProductId(id, baseUrl);
    console.log('Product loaded:', product);

    // 2. Fetch coupon info if provided
    let couponInfo = null;
    let discount = 0;

    if (coupon) {
      try {
        couponInfo = await getCouponInfo(id, coupon, baseUrl);
        console.log('Coupon info loaded:', couponInfo);

        if (couponInfo && !couponInfo.error) {
          discount = couponInfo.amount || couponInfo.discount || 0;
        }
      } catch (error) {
        console.error('Error fetching coupon info:', error);
      }
    }

    // 3. Calculate total price
    let total;
    if (
      price_id &&
      product.product_prices &&
      Array.isArray(product.product_prices)
    ) {
      const selectedPrice = product.product_prices.find(
        (price) => price.id === parseInt(price_id)
      );
      total = selectedPrice?.price;
    } else {
      total = product.price || product.product_prices?.[0]?.price;
    }

    // Convert string price to number if needed
    if (total && typeof total === 'string') {
      total = parseFloat(total);
    }

    // 4. Build course link
    const courseLinkParams = new URLSearchParams();
    if (price_id) courseLinkParams.append('price_id', price_id);
    if (coupon) courseLinkParams.append('coupon', coupon);
    if (discount_code) courseLinkParams.append('discount_code', discount_code);

    const courseLink = `https://learn.packagingschool.com/enroll/${id}${
      courseLinkParams.toString() ? `?${courseLinkParams.toString()}` : ''
    }`;

    // 5. Create order
    const numericDiscount = discount ? parseFloat(discount) : 0;

    console.log('Creating order with:', {
      courseDiscount: numericDiscount,
      total,
      couponInfo,
      coupon,
    });

    const orderId = await createNewOrder({
      courseDescription: product.description,
      courseDiscount: numericDiscount,
      courseImage: product.card_image_url,
      courseName: product.name,
      courseLink: courseLink,
      total: total,
      userID: null, // Will be set on client side if user is logged in
      email: null,
      name: null,
    });

    console.log('Order created:', orderId);

    return {
      props: {
        product,
        couponInfo,
        orderId: orderId.id,
        redirectUrl: courseLink,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    return {
      props: {
        product: null,
        couponInfo: null,
        orderId: null,
        redirectUrl: null,
        error: error.message,
      },
    };
  }
}
