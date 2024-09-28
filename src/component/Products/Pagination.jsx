import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Pagination = ({ onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { i18n } = useTranslation()
  const totalPages = 2

  const isRTL = i18n.language === 'ar'

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1
      setCurrentPage(newPage)
      onPageChange(newPage)
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1
      setCurrentPage(newPage)
      onPageChange(newPage)
    }
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  return (
    <div className='flex items-center space-x-2 justify-end mt-6'>
      <button
        className={`p-2 border w-8 h-8 rounded-lg flex items-center justify-center ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400'
            : 'bg-white text-black'
        }`}
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        <span className='sr-only'>{isRTL ? 'التالي' : 'Previous'}</span>
        <svg
          className={`w-4 h-4 ${isRTL ? 'transform rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1
        return (
          <button
            key={page}
            className={`p-2 border w-8 h-8 rounded-lg flex items-center justify-center ${
              currentPage === page
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        )
      })}
      <button
        className={`p-2 border w-8 h-8 rounded-lg flex items-center justify-center ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400'
            : 'bg-white text-black'
        }`}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        <span className='sr-only'>{isRTL ? 'السابق' : 'Next'}</span>
        <svg
          className={`w-4 h-4 ${isRTL ? 'transform rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
