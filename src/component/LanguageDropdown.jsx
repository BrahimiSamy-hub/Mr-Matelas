import { useState, useRef, useEffect } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { MdLanguage } from 'react-icons/md'

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

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
    <div
      className='relative flex flex-col items-center w-[80px]'
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='bg-white p-2 w-[60px] flex items-center justify-between
                           font-bold text-l rounded-lg tracking-wider border-[2px] border-black
                           duration-300 active:text-white'
      >
        <div></div>
        <MdLanguage />
        {!isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
      </button>
      {isOpen && (
        <div className='bg-white absolute top-[50px] w-[120px] flex flex-col items-start rounded-lg p-1 shadow-lg'>
          <div
            onClick={() => {
              setIsOpen(false)
            }}
            className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer rounded-l border-l-transparent'
          >
            <h3>العربية</h3>
            <img className='h-[20px]' src='' alt='' />
          </div>
          <div
            onClick={() => {
              setIsOpen(false)
            }}
            className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer rounded-l border-l-transparent'
          >
            <h3>Français</h3>
            <img className='h-[20px]' src='' alt='' />
          </div>
          <div
            onClick={() => {
              setIsOpen(false)
            }}
            className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer rounded-l border-l-transparent'
          >
            <h3>English</h3>
            <img className='h-[20px]' src='' alt='' />
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
