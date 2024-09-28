import React from 'react'
import { useLocation } from 'react-router-dom'
import Filter from '../component/Products/Filter'
import Footer from '../component/Footer'
import Pagination from '../component/Products/Pagination'
import { products } from '../constant'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Product = () => {
  const { t } = useTranslation()
  const query = useQuery()
  const selectedCategories = query.get('categories')?.split(',') || []

  const filteredProducts = selectedCategories.length
    ? products.filter((product) =>
        selectedCategories.includes(t(product.category))
      )
    : products

  return (
    <>
      <section>
        <div className='bg-white'>
          <div className=''>
            <div className='flex'>
              <div className='hidden lg:block sm:block'>
                <Filter />
              </div>
              <div className='mt-6 grid grid-cols-2 lg:gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
                <div className='col-span-4 mb-[-50px]' data-aos='fade-up'>
                  <div className='flex justify-between'>
                    <h3>
                      {t('productsFound', { count: filteredProducts.length })}
                    </h3>
                  </div>
                </div>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className='group relative col-span-4 sm:col-span-4 lg:col-span-1'
                    data-aos='fade-up'
                  >
                    <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75  lg:w-full'>
                      <img
                        src={product.imageSrc}
                        alt={t(product.imageAlt)}
                        className='h-[200px] w-full object-cover object-center lg:h-[200px] lg:w-full group-hover:scale-90 transition-transform duration-300'
                        loading='lazy'
                      />
                    </div>
                    <div className='mt-4 flex justify-between'>
                      <div>
                        <h3 className='text-black'>
                          <Link to={product.href}>
                            <span
                              aria-hidden='true'
                              className='absolute inset-0 dont-bold'
                            />
                            {t(product.name)}
                          </Link>
                        </h3>
                        <small className='text-sm text-gray-500'>
                          {t(product.category)}
                        </small>
                      </div>
                      <p className='text-md font-medium text-gray-900'>
                        {product.price}
                        <small className='font-bold ml-1'>
                          <sup>{t('devise')}</sup>
                        </small>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Pagination />
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Product
