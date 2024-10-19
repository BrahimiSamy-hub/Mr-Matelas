// import { useLocation } from 'react-router-dom'
// import Filter from '../component/Products/Filter'
// import Footer from '../component/Footer'
// import Pagination from '../component/Products/Pagination'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useProducts } from '../context/ProductContext'

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search)
// }

// const Product = () => {
//   const { products, totalDocs, isLoading, isError, error } = useProducts()

//   const { t, i18n } = useTranslation()
//   const query = useQuery()
//   const selectedCategories = query.get('categories')?.split(',') || []

//   const filteredProducts = selectedCategories.length
//     ? products.filter((product) =>
//         selectedCategories.includes(product.category?._id)
//       )
//     : products

//   if (isLoading) return <div>Loading...</div>
//   if (isError) return <div>Error: {error.message}</div>

//   // Map language codes to product property prefixes
//   const languagePrefixes = {
//     en: 'eng',
//     fr: 'fr',
//     ar: 'ar',
//   }

//   const currentLanguage = i18n.language
//   const languagePrefix = languagePrefixes[currentLanguage] || 'eng'

//   return (
//     <>
//       <div>
//         <div className=''>
//           <div className='flex'>
//             <div className='mt-6 grid grid-cols-2 lg:gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
//               <div className='col-span-4 mb-[-50px]'>
//                 <div className='flex justify-between'>
//                   <h3>{t('productsFound', { count: totalDocs })}</h3>
//                 </div>
//               </div>
//               {filteredProducts.map((product) => {
//                 const productName =
//                   product[`${languagePrefix}Name`] || product.engName
//                 const categoryName = product.category
//                   ? product.category[`${languagePrefix}Name`] ||
//                     product.category.engName
//                   : ''
//                 const imageAlt =
//                   product[`${languagePrefix}Name`] || product.engName

//                 return (
//                   <div
//                     key={product._id}
//                     className='group relative col-span-4 sm:col-span-4 lg:col-span-1'
//                     data-aos='fade-up'
//                   >
//                     <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-100 lg:aspect-none lg:w-full relative group-hover:scale-95 group duration-300 transition-transform'>
//                       {/* First image */}
//                       <img
// draggable = 'false'
//                         src={product.images.urls[0]}
//                         alt={imageAlt}
//                         className='h-[200px] w-full object-contain object-center lg:h-[200px] lg:w-full group-hover:scale-105 duration-150 transition-transform first-image'
//                         loading='lazy'
//                       />
//                       {/* Second image for hover */}
//                       <img
// draggable = 'false'
//                         src={product.images.urls[1]}
//                         alt={imageAlt}
//                         className='h-full w-full object-contain object-center lg:h-full lg:w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 hover-image'
//                         loading='lazy'
//                       />
//                     </div>
//                     <div className='mt-2 flex justify-between'>
//                       <div>
//                         <h3 className='text-black'>
//                           <Link to={`/products/${product._id}`}>
//                             <span
//                               aria-hidden='true'
//                               className='absolute inset-0 dont-bold'
//                             />
//                             {productName}
//                           </Link>
//                         </h3>
//                         <small className='text-sm text-gray-500'>
//                           {categoryName}
//                         </small>
//                       </div>
//                       <p className='text-sm font-medium text-gray-900'>
//                         {product.sizes[0].price}
//                         <small className='font-semibold ml-1'>
//                           <sup>{t('devise')}</sup>
//                         </small>{' '}
//                         - {product?.sizes[1]?.price}
//                         <small className='font-semibold ml-1'>
//                           <sup>{t('devise')}</sup>
//                         </small>
//                       </p>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//           <Pagination />
//         </div>
//       </div>
//     </>
//   )
// }

// export default Product

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
      <div>
        <div className=''>
          <div className='flex min-h-96'>
            <div className='mt-6 grid grid-cols-2 lg:gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
              <div className='col-span-4 mb-[-50px]'>
                <div className='flex justify-between'>
                  <h3>{t('productsFound', { count: totalDocs })}</h3>
                </div>
              </div>
              {filteredProducts.map((product) => {
                const productName =
                  product[`${languagePrefix}Name`] || product.engName
                const categoryName = product.category
                  ? product.category[`${languagePrefix}Name`] ||
                    product.category.engName
                  : ''
                const imageAlt =
                  product[`${languagePrefix}Name`] || product.engName

                const lastPriceIndex = product.sizes.length - 1
                const firstPrice = product.sizes[0].price
                const lastPrice = product.sizes[lastPriceIndex].price

                return (
                  <div
                    key={product._id}
                    className='group relative col-span-4 sm:col-span-4 lg:col-span-1'
                    data-aos='fade-up'
                  >
                    <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-100 lg:aspect-none lg:w-full relative group-hover:scale-95 group duration-300 transition-transform'>
                      {/* First image */}
                      <img
                        draggable='false'
                        src={product.images.urls[0]}
                        alt={imageAlt}
                        className='h-[200px] w-full object-contain object-center lg:h-[200px] lg:w-full group-hover:scale-105 duration-150 transition-transform first-image'
                        loading='lazy'
                      />
                      {/* Second image for hover */}
                      <img
                        draggable='false'
                        src={product.images.urls[1]}
                        alt={imageAlt}
                        className='h-full w-full object-contain object-center lg:h-full lg:w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 hover-image'
                        loading='lazy'
                      />
                    </div>
                    <div className='mt-2 flex justify-between'>
                      <div>
                        <h3 className='text-black'>
                          <Link
                            to={`/products/${product._id}`}
                            draggable='false'
                          >
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
                      <p className='text-sm font-medium text-gray-900'>
                        {firstPrice === lastPrice ? (
                          <>
                            {firstPrice}
                            <small className='font-semibold ml-1'>
                              <sup>{t('devise')}</sup>
                            </small>
                          </>
                        ) : (
                          <>
                            {firstPrice}
                            <small className='font-semibold ml-1'>
                              <sup>{t('devise')}</sup>
                            </small>{' '}
                            - {lastPrice}
                            <small className='font-semibold ml-1'>
                              <sup>{t('devise')}</sup>
                            </small>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <Pagination />
        </div>
      </div>
    </>
  )
}

export default Product
