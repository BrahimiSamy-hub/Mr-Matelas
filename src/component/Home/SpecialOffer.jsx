// import { arrowRight } from '../assets/icons'
// import { offer } from '../assets/images'
import Button from '../Button'
import { matelas } from '../../assets'
const SpecialOffer = () => {
  return (
    <div className='flex justify-between items-center max-xl:flex-col-reverse gap-10 max-container'>
      <div className='flex-1'>
        <img
          src={matelas}
          alt='Shoe Promotion'
          width={773}
          height={687}
          className='object-contain w-full'
        />
      </div>
      <div className='flex flex-1 flex-col'>
        <h2 className='text-4xl font-palanquin font-bold'>
          <span className='text-blue-300'>Special </span>
          Offer
        </h2>
        <p className='mt-4 text-[#6D6D6D] text-lg leading-7 font-palanquin '>
          Embark on a shopping journey that redefines your experience with
          unbeatable deals. From premier selections to incredible savings, we
          offer unparalleled value that sets us apart.
        </p>
        <p className='mt-6 text-[#6D6D6D] text-lg leading-7'>
          Navigate a realm of possibilities designed to fulfill your unique
          desires, surpassing the loftiest expectations. Your journey with us is
          nothing short of exceptional.
        </p>
        <div className='mt-11 flex flex-wrap gap-4'>
          <Button label='Shop now' iconURL='' />
        </div>
      </div>
    </div>
  )
}

export default SpecialOffer
