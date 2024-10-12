import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { logo, MenuSvg, logoPng } from '../assets'
import { navigation } from '../constant'
import { useCart } from '../context/CartContext'
import LanguageDropdown from './LanguageDropdown'

const Navbar = () => {
  const { toggleCart, cartItems } = useCart()
  const { t, i18n } = useTranslation()
  const [openNavigation, setOpenNavigation] = useState(false)

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation)
  }

  const handleClick = () => {
    if (!openNavigation) return
    setOpenNavigation(false)
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      if (lng === 'ar') {
        document.documentElement.dir = 'rtl'
        document.documentElement.classList.add('rtl')
      } else {
        document.documentElement.dir = 'ltr'
        document.documentElement.classList.remove('rtl')
      }
      localStorage.setItem('i18nextLng', lng) // Store the selected language in local storage
    }
    handleLanguageChange(i18n.language) // Set direction on initial load
    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  return (
    <header className='xl:sm:pl-16 pl-8 wide:sm:pr-16 pr-8 fixed w-full bg-white shadow-md z-50'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <NavLink to='/' draggable='false'>
            <img
              src={logoPng}
              alt='logo'
              className='w-full h-20 py-1'
              loading='lazy'
              draggable='false'
            />
          </NavLink>
        </div>
        <nav className='hidden lg:flex items-center gap-8'>
          {navigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.url}
              className={({ isActive }) =>
                `relative font-semibold text-lg transition duration-300 hover:text-[#0a62a5] uppercase ${
                  isActive ? 'text-[#0a62a5] font-extrabold' : 'text-black'
                }`
              }
            >
              {t(item.title)}
            </NavLink>
          ))}
        </nav>
        <div className='flex items-center gap-6'>
          <LanguageDropdown />
          <button className='relative' onClick={toggleCart}>
            <IoCartOutline
              size={45}
              color='0a62a5'
              className=' font-extrabold hover:-rotate-12 hover:opacity-75 transition duration-300'
            />
            {totalItems > 0 && (
              <span className='absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full'>
                {totalItems}
              </span>
            )}
          </button>
          <button className='lg:hidden' onClick={toggleNavigation}>
            <MenuSvg openNavigation={openNavigation} />
          </button>
        </div>
      </div>
      {openNavigation && (
        <div className='lg:hidden'>
          <ul className='flex flex-col items-center gap-6 py-6'>
            {navigation.map((item) => (
              <li key={item.id} onClick={handleClick}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `block text-lg font-medium transition duration-300 hover:text-[#0a62a5]  uppercase ${
                      isActive ? 'text-[#0a62a5] font-extrabold' : 'text-black'
                    }`
                  }
                >
                  {t(item.title)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
