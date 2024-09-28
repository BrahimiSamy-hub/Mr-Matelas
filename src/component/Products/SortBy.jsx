import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const SortBy = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [sortOption, setSortOption] = useState('')
  const dropdownRef = useRef(null)

  const handleSortChange = (option) => {
    setSortOption(option)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative inline-block text-left'>
      <div ref={dropdownRef}>
        <button
          type='button'
          className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white'
          id='options-menu'
          onClick={toggleDropdown}
        >
          Sort by {sortOption}
          <svg
            className={`w-5 h-5 ml-2 -mr-1 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.292 7.292a1 1 0 011.416 0L10 10.586l3.292-3.294a1 1 0 011.416 1.416l-4 4a1 1 0 01-1.416 0l-4-4a1 1 0 010-1.416z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {isOpen &&
        createPortal(
          <div
            className='absolute right-0 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg '
            style={{
              top: dropdownRef.current.getBoundingClientRect().bottom,
              left: dropdownRef.current.getBoundingClientRect().left,
            }}
          >
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              <span
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                role='menuitem'
                onClick={() => {
                  setSortOption('Latest')
                  setIsOpen(false)
                }}
              >
                Latest
              </span>
              <span
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                role='menuitem'
                onClick={() => handleSortChange('Oldest')}
              >
                Oldest
              </span>
              <span
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                role='menuitem'
                onClick={() => handleSortChange('Popular')}
              >
                Popular
              </span>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default SortBy
