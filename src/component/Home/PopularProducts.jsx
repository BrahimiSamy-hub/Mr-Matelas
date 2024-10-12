// import { useProducts } from '../../context/ProductContext'
// import PopularProductCard from './PopularProductCard'

// const PopularProducts = () => {
//   const { products } = useProducts()

//   // Sort products by the createdAt field in descending order (newest first) and limit to 4 products
//   const displayedProducts = products
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 4)

//   return (
//     <div id='products' className='max-container max-sm:mt-12'>
//       <div className='flex flex-col justify-start gap-5'>
//         <h2 className='text-4xl font-palanquin font-bold'>
//           Our <span className='text-[#0a62a5]'>Newest</span> Products
//         </h2>
//         <p className='lg:max-w-lg mt-2 font-montserrat text-lg text-[#6D6D6D]'>
//           Experience top-notch quality and style with our sought-after
//           selections. Discover a world of comfort, design, and value.
//         </p>
//       </div>

//       <div className='mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14'>
//         {displayedProducts.map((product) => {
//           const lastPriceIndex = product.sizes.length - 1 // Get the index of the last price
//           return (
//             <PopularProductCard
//               key={product._id}
//               name={product.frName}
//               price={product?.sizes[0]?.price} // First price (index 0)
//               lastPrice={product?.sizes[lastPriceIndex]?.price} // Last available price
//               _id={product._id}
//             />
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default PopularProducts

import { useTranslation } from 'react-i18next'
import { useProducts } from '../../context/ProductContext'
import PopularProductCard from './PopularProductCard'

const PopularProducts = () => {
  const { products } = useProducts()
  const { t } = useTranslation()

  // Sort products by the createdAt field in descending order (newest first) and limit to 4 products
  const displayedProducts = products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)

  return (
    <div id='products' className='max-container max-sm:mt-12'>
      <div className='flex flex-col justify-start gap-5'>
        <h2 className='text-4xl font-palanquin font-bold'>
          {t('popularProducts.title1')}{' '}
          <span className='text-[#0a62a5]'>{t('popularProducts.title2')}</span>
        </h2>
        <p className='lg:max-w-lg mt-2 font-montserrat text-lg text-[#6D6D6D]'>
          {t('popularProducts.description')}
        </p>
      </div>

      <div className='mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14'>
        {displayedProducts.map((product) => {
          const lastPriceIndex = product.sizes.length - 1 // Get the index of the last price
          return (
            <PopularProductCard
              key={product._id}
              name={product.frName}
              price={product?.sizes[0]?.price} // First price (index 0)
              lastPrice={product?.sizes[lastPriceIndex]?.price} // Last available price
              _id={product._id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PopularProducts
