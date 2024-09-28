import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { yourlogo, MenuSvg } from '../assets'
import { navigation } from '../constant'
import { useCart } from '../context/CartContext'
import LanguageDropdown from './LanguageDropdown'

const Navbar = () => {
  const { toggleCart, cartItems } = useCart()
  const { t, i18n } = useTranslation()
  const [openNavigation, setOpenNavigation] = useState(false)

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false)
      enablePageScroll()
    } else {
      setOpenNavigation(true)
      disablePageScroll()
    }
  }

  const handleClick = () => {
    if (!openNavigation) return
    enablePageScroll()
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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className='z-50 fixed flex w-full bg-white p-4 justify-between px-6 items-center shadow-sm min-h-20'>
      <div className='justify-center'>
        <NavLink to='/'>
          <img src={yourlogo} alt='logo' className='' loading='lazy' />
        </NavLink>
      </div>
      <nav className='items-center justify-center hidden lg:flex'>
        <ul className='flex gap-10'>
          {navigation.map((item) => (
            <li key={item.id} className='relative font-semibold group'>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  `relative ${
                    isActive
                      ? 'text-black font-bold after:w-full '
                      : 'text-black after:w-0'
                  }
                  after:absolute after:left-0 after:bottom-0  after:h-[2px] after:bg-black after:transition-all after:duration-300 group-hover:after:w-full`
                }
              >
                {t(item.title)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className='flex items-center'>
        {/* <div className='flex  mr-2 gap-2 ml-6'>
          <button
            onClick={() => changeLanguage('fr')}
            className={`px-4 py-2 rounded-md ${
              i18n.language === 'fr' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            FR
          </button>
          <button
            onClick={() => changeLanguage('ar')}
            className={`px-4 py-2 rounded-md ${
              i18n.language === 'ar' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            AR
          </button>
        </div> */}
        <LanguageDropdown />
        <button className='ml-6 mr-2 relative lg:flex' onClick={toggleCart}>
          <IoCartOutline size={40} />
          <span className='absolute -top-2 -right-3 flex items-center justify-center w-6 h-6 font-bold text-white bg-black rounded-full '>
            <h6 className='mb-0.5'>{totalItems}</h6>
          </span>
        </button>

        {/* <div className='ml-auto lg:hidden' onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </div> */}
      </div>
    </div>
  )
}

export default Navbar
