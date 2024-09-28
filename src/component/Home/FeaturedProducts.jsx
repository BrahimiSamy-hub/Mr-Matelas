import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'

function App() {
  return (
    <section>
      <h1 className='heading font-bold text-center mb-8 text-2xl'>
        Featured Products
      </h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className='swiper_container'
      >
        {[...Array(6)].map((_, index) => (
          <SwiperSlide key={index} className='relative group'>
            <Link to='/singleproduct' className='block'>
              <div className='relative overflow-hidden'>
                <img
                  src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'
                  alt='slide_image'
                  loading='lazy'
                  className='w-full transition-opacity duration-500 group-hover:opacity-0'
                />
                <img
                  src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg'
                  alt='slide_image'
                  loading='lazy'
                  className='w-full absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                />
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                  <h2 className='text-white text-lg font-semibold'>
                    Product Name
                  </h2>
                  <p className='text-white text-sm'>
                    3500{' '}
                    <small>
                      <sup>DA</sup>
                    </small>
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <div className='slider-controler'>
          <div className='swiper-pagination'></div>
        </div>
      </Swiper>
    </section>
  )
}

export default App
