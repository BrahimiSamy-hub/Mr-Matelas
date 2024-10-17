import { matelas } from '../../assets'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const PopularProductCard = ({ _id, name, price, lastPrice }) => {
  const { t } = useTranslation()
  return (
    <Link
      draggable='false'
      to={`/products/${_id}`}
      key={_id}
      className='relative flex flex-1 flex-col w-full hover:scale-95 transition-transform duration-300 group justify-center items-center rounded-[20px] shadow-xl'
    >
      {/* Red label in the top-right corner */}
      <div className='absolute top-5 right-0 bg-red-500 text-white text-md px-2 py-1 rounded-tr-[20px] rounded-bl-[20px] z-10'>
        New!
      </div>

      <img
        draggable='false'
        src={matelas}
        alt={name}
        className='w-[282px] h-[282px] object-contain group-hover:scale-110 transition-transform duration-700'
      />
      <h3 className='mt-2 text-2xl leading-normal font-semibold font-palanquin'>
        {name}
      </h3>

      <p className='my-2 font-semibold font-montserrat text-[#0a62a5] text-xl leading-normal'>
        {price === lastPrice ? (
          <>
            {price}
            <small>
              <sup> {t('devise')} </sup>
            </small>
          </>
        ) : (
          <>
            {price}
            <small>
              <sup> {t('devise')} </sup>
            </small>
            - {lastPrice}
            <small>
              <sup> {t('devise')} </sup>
            </small>
          </>
        )}
      </p>
    </Link>
  )
}

export default PopularProductCard
