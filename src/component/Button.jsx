import { Link } from 'react-router-dom'
import { FaCircleArrowRight } from 'react-icons/fa6'
const Button = ({
  label,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
}) => {
  return (
    <Link to='/shop'>
      <button
        className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none hover:opacity-75 hover:scale-105 transition-transform duration-500
      ${
        backgroundColor
          ? `${backgroundColor} ${textColor} ${borderColor}`
          : 'bg-blue-300 text-white border-coral-red'
      } rounded-full ${fullWidth && 'w-full'}`}
      >
        {label}

        <FaCircleArrowRight size={22} />
      </button>
    </Link>
  )
}

export default Button
