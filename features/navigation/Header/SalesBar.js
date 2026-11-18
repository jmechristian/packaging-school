import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import {
  CheckIcon,
  ClipboardDocumentIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { createSalesbarClick } from '../../../src/graphql/mutations';
import { trackAbPromoClick } from '../../../libs/analytics';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const COUPON_CODE = 'packagingschoolcyber2026';
const LEAF_COPY_COUNT = 3;

const FallingLeaf = ({ animationData, speed, frame }) => {
  const lottieRef = useRef(null);
  const [data] = useState(() => JSON.parse(JSON.stringify(animationData)));

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={data}
      loop
      autoplay={false}
      renderer='canvas'
      className='h-full w-full'
      onDOMLoaded={() => {
        const animation = lottieRef.current;
        if (!animation) return;
        animation.setSpeed(speed);
        animation.goToAndPlay(frame, true);
      }}
    />
  );
};

const FallingLeaves = ({ animationData }) => {
  const [copies] = useState(() =>
    Array.from({ length: LEAF_COPY_COUNT }, () => ({
      speed: 0.65 + Math.random() * 0.7,
      frame: Math.floor(Math.random() * 280),
      shift: Math.round((Math.random() - 0.5) * 24),
    }))
  );

  return (
    <div
      aria-hidden='true'
      className='pointer-events-none absolute right-full top-1/2 z-0 flex -translate-y-1/2'
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, #000 0%, #000 82%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, #000 0%, #000 82%, transparent 100%)',
      }}
    >
      {copies.map((copy, index) => (
        <div
          key={index}
          className='h-[220px] w-[110px] sm:h-[280px] sm:w-[145px] lg:h-[340px] lg:w-[168px] [&:not(:first-child)]:-ml-8'
          style={{ marginTop: copy.shift }}
        >
          <FallingLeaf
            animationData={animationData}
            speed={copy.speed}
            frame={copy.frame}
          />
        </div>
      ))}
    </div>
  );
};

const SalesBar = () => {
  const router = useRouter();
  const { location } = useSelector((state) => state.auth);
  const [leaves, setLeaves] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/leaves.json')
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) setLeaves(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const writeCouponToClipboard = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(COUPON_CODE);
        return true;
      }
    } catch {
      // Fall through to the selection-based copy path.
    }

    try {
      const input = document.createElement('textarea');
      input.value = COUPON_CODE;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.top = '0';
      input.style.left = '0';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.focus();
      input.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(input);
      return ok;
    } catch {
      return false;
    }
  };

  const copyCoupon = async () => {
    const didCopy = await writeCouponToClipboard();
    if (didCopy) setCopied(true);

    trackAbPromoClick({
      pagePath: router.asPath,
      source: 'cyber_monday_sales_bar',
      metadata: {
        promo: 'cyber_monday_2026',
        action: 'copy_coupon',
        code: COUPON_CODE,
        copied: didCopy,
      },
    });

    API.graphql({
      query: createSalesbarClick,
      variables: {
        input: {
          country: location?.country || null,
          ipAddress: location?.ip || null,
          link: `coupon:${COUPON_CODE}`,
          page: router.asPath,
        },
      },
    }).catch(() => {});
  };

  return (
    <div className='relative overflow-hidden border-b-2 border-clemson bg-[#10141c]'>
      <div className='relative mx-auto flex min-h-[64px] w-full items-center justify-center px-4 py-2.5 md:px-8 md:py-3'>
        <div className='relative z-10 flex w-fit items-center gap-[3.2rem] md:gap-[5.6rem]'>
          {leaves ? <FallingLeaves animationData={leaves} /> : null}
          <div className='min-w-0'>
            <div className='text-xl font-bold !leading-none text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9)] md:text-2xl'>
              Cyber Monday Deal Live!
            </div>
            <div className='mt-1 text-sm !leading-none text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9)] md:text-base'>
              <span className='font-semibold text-clemson [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]'>
                25% off
              </span>{' '}
              Site-wide (excluding CMPM program)
            </div>
          </div>

          <div className='flex shrink-0 items-center gap-3'>
            <button
              type='button'
              onClick={copyCoupon}
              aria-label={copied ? 'Coupon code copied' : 'Copy coupon code'}
              className='inline-flex items-center gap-1.5 rounded-md bg-clemson px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-clemson-dark md:px-4 md:text-base'
            >
              {copied ? (
                <CheckIcon className='h-5 w-5' aria-hidden='true' />
              ) : (
                <ClipboardDocumentIcon className='h-5 w-5' aria-hidden='true' />
              )}
              {copied ? 'Copied' : 'Copy code'}
            </button>
            <div className='flex items-center gap-1 text-xs font-medium !leading-none text-white sm:text-sm'>
              <ClockIcon
                className='h-3.5 w-3.5 shrink-0 text-clemson'
                aria-hidden='true'
              />
              <span>
                Ends{' '}
                <span className='font-semibold text-clemson'>
                  November 30th
                </span>{' '}
                at midnight
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesBar;
