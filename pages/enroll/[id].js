import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createNewOrder, getCouponInfo, getProductId } from '../../helpers/api';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import { useSelector } from 'react-redux';

export default function Enroll() {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [couponInfo, setCouponInfo] = useState(null);
  const [couponAttempted, setCouponAttempted] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();
  const { id, price_id, coupon, discount_code } = router.query;
  const { awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();

  useEffect(() => {
    // Only fetch if we have an id and haven't already loaded the product
    if (id && !product) {
      const fetchProduct = async () => {
        try {
          console.log('Fetching product for id:', id);
          const productData = await getProductId(id);
          console.log('Product loaded:', productData);
          setProduct(productData);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [id, product]);

  // Reset coupon state when router query changes
  useEffect(() => {
    if (router.isReady && id && coupon) {
      console.log('Resetting coupon state for:', { id, coupon });
      setCouponAttempted(false);
      setCouponInfo(null);
      setDiscount(null);
    }
  }, [router.isReady, id, coupon]);

  useEffect(() => {
    console.log('Coupon effect check:', {
      id,
      coupon,
      couponAttempted,
      routerReady: router.isReady,
    });

    // Only fetch coupon info if router is ready, we have both id and coupon, and haven't already attempted it
    if (router.isReady && id && coupon && !couponAttempted) {
      console.log('Starting coupon fetch...');
      setCouponAttempted(true);
      const fetchCouponInfo = async () => {
        try {
          console.log('Fetching coupon info for:', { id, coupon });
          const response = await getCouponInfo(id, coupon);
          console.log('Coupon info response:', response);

          // Check if the response indicates an error
          if (response.error || response.message === 'Coupon not found') {
            console.log('Coupon not found or invalid:', response);
            setCouponInfo(null);
          } else {
            console.log('Setting coupon info:', response);
            setCouponInfo(response);
          }
        } catch (error) {
          console.error('Error fetching coupon info:', error);
          // Set couponInfo to null to indicate it was attempted but failed
          setCouponInfo(null);
        }
      };

      fetchCouponInfo();
    } else if (router.isReady && !coupon && !couponAttempted) {
      // No coupon provided, mark as attempted
      console.log('No coupon provided, marking as attempted');
      setCouponAttempted(true);
      setCouponInfo(null);
    }
  }, [router.isReady, id, coupon, couponAttempted]);

  useEffect(() => {
    if (couponInfo) {
      // Handle different discount types and field names
      if (couponInfo.amount) {
        setDiscount(couponInfo.amount);
      } else if (couponInfo.discount) {
        setDiscount(couponInfo.discount);
      }
    }
  }, [couponInfo]);

  useEffect(() => {
    // Only run order handler once when we have all required data
    // Make sure we've attempted to load coupon info first (even if it failed)
    console.log('Order handler effect check:', {
      product: !!product,
      order: !!order,
      couponAttempted,
      couponInfo,
      discount,
    });

    if (product && !order && couponAttempted) {
      const orderHandler = async () => {
        console.log('Running order handler with:', {
          product,
          couponInfo,
          discount,
        });

        // Build course link with optional parameters
        const courseLinkParams = new URLSearchParams();
        if (price_id) courseLinkParams.append('price_id', price_id);
        if (coupon) courseLinkParams.append('coupon', coupon);
        if (discount_code)
          courseLinkParams.append('discount_code', discount_code);

        const courseLink = `https://learn.packagingschool.com/enroll/${id}${
          courseLinkParams.toString() ? `?${courseLinkParams.toString()}` : ''
        }`;

        // Safely get the price
        let total;
        console.log('Price calculation debug:', {
          price_id,
          product_price: product.price,
          product_prices: product.product_prices,
          product_prices_length: product.product_prices?.length,
        });

        if (
          price_id &&
          product.product_prices &&
          Array.isArray(product.product_prices)
        ) {
          const selectedPrice = product.product_prices.find(
            (price) => price.id === parseInt(price_id)
          );
          console.log('Selected price by ID:', selectedPrice);
          total = selectedPrice?.price;
        } else {
          console.log('Using fallback price:', {
            product_price: product.price,
            first_product_price: product.product_prices?.[0]?.price,
          });
          total = product.price || product.product_prices?.[0]?.price;
        }

        console.log('Total before conversion:', total, typeof total);

        // Convert string price to number if needed
        if (total && typeof total === 'string') {
          total = parseFloat(total);
        }

        console.log('Final total:', total, typeof total);

        // Only proceed if we have a valid total (including 0 for free courses)
        if (total === null || total === undefined) {
          console.log('No valid total found, skipping order creation');
          console.log('Product data:', product);
          return;
        }

        const orderId = await createNewOrder({
          courseDescription: product.description,
          courseDiscount: discount,
          courseImage: product.card_image_url,
          courseName: product.name,
          courseLink: courseLink,
          total: total,
          userID: awsUser ? awsUser.id : null,
          email: awsUser ? awsUser.email : null,
          name: awsUser ? awsUser.name : null,
        });

        console.log('Order created:', orderId);
        setOrder(orderId);
        setRedirecting(true); // Mark as redirecting
        setIsLoading(true); // Keep loading during redirect

        if (awsUser && awsUser.name.includes(' ')) {
          navigateToThinkific(courseLink, courseLink);
        } else {
          router.push(`/order/${orderId.id}`);
        }
      };

      orderHandler();
    }
  }, [product, couponInfo, discount, order]);

  // Live progress based on enrollment steps
  useEffect(() => {
    let progress = 0;

    // Base progress for router ready
    if (router.isReady) progress += 10;

    // Progress for product loaded
    if (product) progress += 25;

    // Progress for coupon attempted
    if (couponAttempted) progress += 15;

    // Progress for coupon info loaded
    if (couponInfo) progress += 15;

    // Progress for order created
    if (order) progress += 15;

    // Progress for redirect initiated
    if (redirecting) progress += 20;

    setSimProgress(progress);
  }, [
    router.isReady,
    product,
    couponAttempted,
    couponInfo,
    order,
    redirecting,
  ]);

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
