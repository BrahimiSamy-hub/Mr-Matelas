import { matelas } from '../../assets'

const PopularProductCard = ({ name, price }) => {
  return (
    <div className='flex flex-1 flex-col w-full max-sm:w-full hover:scale-95 transition-transform duration-300 group justify-center items-center rounded-[20px] shadow-xl'>
      <img
        src={matelas}
        alt={name}
        className='w-[282px] h-[282px] object-contain group-hover:scale-110 transition-transform duration-700 '
      />
      <h3 className='mt-2 text-2xl leading-normal font-semibold font-palanquin'>
        {name}
      </h3>
      <p className='mt-2 font-semibold font-montserrat text-blue-300 text-xl leading-normal'>
        4500
        <small>
          <sup> DA</sup>
        </small>
      </p>
    </div>
  )
}

export default PopularProductCard
