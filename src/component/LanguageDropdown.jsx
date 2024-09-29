import { useState, useRef, useEffect } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { MdLanguage } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { i18n } = useTranslation()

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

  const languages = [
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
  ]

  return (
    <div
      className='relative flex flex-col items-center w-[80px]'
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='bg-white p-2 w-[50px] flex items-center justify-between
                   font-bold text-l rounded-lg tracking-wider border-[2px] border-[#242323c0]
                   duration-300 active:text-white'
      >
        <MdLanguage />
        {!isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
      </button>
      {isOpen && (
        <div className='bg-white absolute top-[50px] w-[120px] flex flex-col items-start rounded-lg p-1 shadow-lg'>
          {languages.map(({ code, label }) => (
            <div
              key={code}
              onClick={() => {
                i18n.changeLanguage(code)
                setIsOpen(false)
              }}
              className={`flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer rounded-l border-l-transparent ${
                i18n.language === code ? 'bg-[#242323c0] text-white' : ''
              }`}
            >
              <h3>{label}</h3>
              <img className='h-[20px]' src='' alt='' />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
