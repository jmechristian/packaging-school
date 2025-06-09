import React from 'react';

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='flex flex-wrap justify-center items-center gap-2'>
      {pageNumbers.length > 1 &&
        pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`${
              number === currentPage
                ? 'bg-clemson'
                : 'transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[2px_2px_0px_black] hover:shadow-[6px_6px_0px_black]'
            } w-9 h-9 flex items-center justify-center border border-black font-semibold`}
          >
            {number}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
