/* eslint-disable react/prop-types */
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, showItem = 5 }) => {
  const totalPage = Math.ceil(totalItem / parPage);

  if (totalPage <= 1) return null;

  // Ensure startPage and endPage are calculated properly
  let startPage = Math.max(1, pageNumber - Math.floor(showItem / 2));
  let endPage = startPage + showItem - 1;

  // Adjust if endPage exceeds totalPage
  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = Math.max(1, endPage - showItem + 1);
  }

  const createButtons = () => {
    const buttons = [];
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <li
          key={i}
          onClick={() => setPageNumber(i)}
          className={`w-[38px] h-[38px] text-sm md:text-base flex justify-center items-center rounded-full cursor-pointer transition-all duration-200 
            ${pageNumber === i
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 text-gray-800 hover:bg-indigo-200 hover:text-indigo-800'
            }`}
        >
          {i}
        </li>
      );
    }
    return buttons;
  };

  return (
    <ul className='flex items-center justify-center gap-2 md:gap-3 py-4 flex-wrap'>
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[38px] h-[38px] flex justify-center items-center bg-slate-100 hover:bg-indigo-200 text-gray-800 hover:text-indigo-800 rounded-full cursor-pointer transition-all duration-200"
        >
          <BsChevronDoubleLeft />
        </li>
      )}

      {createButtons()}

      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[38px] h-[38px] flex justify-center items-center bg-slate-100 hover:bg-indigo-200 text-gray-800 hover:text-indigo-800 rounded-full cursor-pointer transition-all duration-200"
        >
          <BsChevronDoubleRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
