import React from 'react';
import { MdHourglassEmpty } from 'react-icons/md';
import CatalogVideoPreview from './CatalogVideoPreview';

const formatPrice = (price) => {
  if (price === 'FREE' || price === 'Free' || price === 0 || price === '0') {
    return 'Free';
  }
  return `$${price}`;
};

const CatalogGridCard = ({
  courseId,
  title,
  subtitle,
  hours,
  metaCount,
  metaCountLabel = 'Lessons',
  price,
  seoImage,
  previewUrl,
  isNavigating,
  onCardClick,
  onPurchase,
  purchaseLabel = 'Enroll',
  hidePrice = false,
  isCertificate = false,
  abbreviation,
}) => {
  const handleClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    onCardClick?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCardClick?.();
    }
  };

  return (
    <article
      role='button'
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group flex flex-col h-full border border-slate-200 rounded-lg overflow-hidden transition-all ${
        isNavigating
          ? 'cursor-wait opacity-80'
          : 'cursor-pointer hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5'
      } ${isCertificate ? 'bg-clemson/5' : 'bg-white'}`}
    >
      <CatalogVideoPreview
        seoImage={seoImage}
        previewUrl={previewUrl}
        title={title}
      />

      <div className='flex flex-col flex-1 gap-2 p-4'>
        <div className='flex items-start justify-between gap-2'>
          <span className='text-xs font-mono text-slate-500 leading-none pt-0.5'>
            {courseId}
          </span>
          {isCertificate && abbreviation && (
            <span className='text-[10px] font-semibold uppercase tracking-wide text-clemson bg-clemson/10 px-1.5 py-0.5 rounded'>
              {abbreviation}
            </span>
          )}
        </div>

        <h3 className='font-semibold text-slate-900 text-base leading-tight'>
          {title}
        </h3>

        {subtitle ? (
          <p className='text-sm text-slate-600 leading-snug line-clamp-5 flex-1'>
            {subtitle}
          </p>
        ) : (
          <div className='flex-1' />
        )}

        <div className='flex items-end justify-between gap-3 pt-3 mt-auto border-t border-slate-100'>
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600'>
            {hours != null && hours !== '' && (
              <span>
                <span className='font-semibold text-slate-800'>{hours}</span>{' '}
                hrs
              </span>
            )}
            {metaCount != null && metaCount !== '' && (
              <span>
                <span className='font-semibold text-slate-800'>
                  {metaCount}
                </span>{' '}
                {metaCountLabel}
              </span>
            )}
          </div>

          {!hidePrice && (
            <div className='flex flex-col items-end gap-0.5 flex-shrink-0'>
              {isNavigating ? (
                <MdHourglassEmpty
                  size={18}
                  className='text-base-brand animate-pulse'
                />
              ) : (
                <>
                  <span className='text-base font-semibold text-slate-900 leading-none'>
                    {formatPrice(price)}
                  </span>
                  {onPurchase && (isCertificate || price !== 'FREE') && (
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        onPurchase();
                      }}
                      className='text-xs font-medium text-base-brand hover:underline'
                    >
                      {purchaseLabel}
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default CatalogGridCard;
