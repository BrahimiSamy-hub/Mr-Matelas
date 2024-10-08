import { useState } from 'react'
import hero from '../../assets/hero.png'
import Button from '../Button'

const Hero = () => {
  return (
    <div
      id='home'
      className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container'
    >
      <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full pt-28'>
        <p className='text-xl font-montserrat text-blue-300'>
          Our new products
        </p>

        <h1 className='mt-10 text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold'>
          <span className='xl:bg-white xl:whitespace-nowrap rounded-full relative z-10 pr-6'>
            The New Arrival
          </span>
          <br />
          <span className='text-6xl '>of </span>
          <span className='text-blue-300 inline-block mt-5 xl:bg-white xl:whitespace-nowrap relative z-10 rounded-full pr-6 t'>
            MATTRESSES
          </span>
        </h1>
        <p className='font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm'></p>

        <Button label='Check it out' />
      </div>

      <div
        className='relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-cover h-screen bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${hero})` }}
      >
        {/* <img
            draggable='false'
          src={matelas}
          alt='shoe colletion'
          width={610}
          height={502}
          className='object-contain relative z-10'
        /> */}
      </div>
    </div>
  )
}

export default Hero
