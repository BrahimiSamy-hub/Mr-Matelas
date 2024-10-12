import { Link } from 'react-router-dom'
import { FaCircleArrowRight, FaCircleArrowLeft } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

const Button = ({
  label,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
}) => {
  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar' // Check if the current language is Arabic

  return (
    <Link to='/shop' draggable='false'>
      <button
        className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none hover:opacity-75 hover:scale-105 transition-transform duration-500
      ${
        backgroundColor
          ? `${backgroundColor} ${textColor} ${borderColor}`
          : 'bg-[#0a62a5] text-white border-coral-red'
      } rounded-full ${fullWidth && 'w-full'}`}
      >
        {label}

        {/* Conditionally render the correct arrow icon */}
        {isArabic ? (
          <FaCircleArrowLeft size={22} />
        ) : (
          <FaCircleArrowRight size={22} />
        )}
      </button>
    </Link>
  )
}

export default Button
