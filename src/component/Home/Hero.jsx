import { useState } from 'react'
import { matelas } from '../../assets'
import Button from '../Button'

const Hero = () => {
  return (
    <div
      id='home'
      className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container'
    >
      <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full pt-28'>
        <p className='text-xl font-montserrat text-blue-300'>
          Our New collections
        </p>

        <h1 className='mt-10 text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold'>
          <span className='xl:bg-white xl:whitespace-nowrap rounded-full relative z-10 pr-10'>
            The New Arrival
          </span>
          <br />
          <span className='text-blue-300 inline-block mt-3'>Nike</span> Shoes
        </h1>
        <p className='font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm'></p>

        <Button label='Check it out' iconURL='' />
      </div>

      <div className='relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-blue-200 bg-cover bg-center'>
        <img
          src={matelas}
          alt='shoe colletion'
          width={610}
          height={502}
          className='object-contain relative z-10'
        />
      </div>
    </div>
  )
}

export default Hero
