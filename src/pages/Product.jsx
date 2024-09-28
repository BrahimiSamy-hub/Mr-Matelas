import React from 'react'
import { useLocation } from 'react-router-dom'
import Filter from '../component/Products/Filter'
import Footer from '../component/Footer'
import Pagination from '../component/Products/Pagination'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useProducts } from '../context/ProductContext'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Product = () => {
  const { products, totalDocs, isLoading, isError, error } = useProducts()

  const { t, i18n } = useTranslation()
  const query = useQuery()
  const selectedCategories = query.get('categories')?.split(',') || []

  const filteredProducts = selectedCategories.length
    ? products.filter((product) =>
        selectedCategories.includes(product.category?._id)
      )
    : products

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  // Map language codes to product property prefixes
  const languagePrefixes = {
    en: 'eng',
    fr: 'fr',
    ar: 'ar',
  }

  const currentLanguage = i18n.language
  const languagePrefix = languagePrefixes[currentLanguage] || 'eng'

  return (
    <>
      <section>
        <div className=''>
          <div className='flex'>
            <div className='hidden lg:block sm:block'>
              <Filter />
            </div>
            <div className='mt-6 grid grid-cols-2 lg:gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
              <div className='col-span-4 mb-[-50px]' data-aos='fade-up'>
                <div className='flex justify-between'>
                  <h3>{t('productsFound', { count: totalDocs })}</h3>
                </div>
              </div>
              {filteredProducts.map((product) => {
                // Dynamically get product and category names based on language
                const productName =
                  product[`${languagePrefix}Name`] || product.engName
                const categoryName = product.category
                  ? product.category[`${languagePrefix}Name`] ||
                    product.category.engName
                  : ''
                const imageAlt =
                  product[`${languagePrefix}Name`] || product.engName

                return (
                  <div
                    key={product._id}
                    className='group relative col-span-4 sm:col-span-4 lg:col-span-1'
                    data-aos='fade-up'
                  >
                    <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:w-full'>
                      <img
                        src={product.images.urls[0]}
                        alt={imageAlt}
                        className='h-full w-full object-contain object-center lg:h-full lg:w-full group-hover:scale-105 duration-150 transition-transform'
                        loading='lazy'
                      />
                    </div>
                    <div className='mt-4 flex justify-between'>
                      <div>
                        <h3 className='text-black'>
                          <Link to={`/products/${product._id}`}>
                            <span
                              aria-hidden='true'
                              className='absolute inset-0 dont-bold'
                            />
                            {productName}
                          </Link>
                        </h3>
                        <small className='text-sm text-gray-500'>
                          {categoryName}
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
                )
              })}
            </div>
          </div>
          <Pagination />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Product
