import React from 'react'
import { Link } from 'react-router-dom'
import lits from '../../assets/lits.webp'
import matelas from '../../assets/matelasC.webp'
import oreillers from '../../assets/oreillers.webp'
import linge from '../../assets/Linge.webp'
import { CategoriesProvider } from '../../context/CategoriesContext'
import { FaArrowRight } from 'react-icons/fa'
const ProductCollection = () => {
  const products = [
    {
      title: 'Discover Skincare',
      imageUrl: lits, // Replace with the actual image
      productCount: 2,
    },
    {
      title: 'Beauty of Skin',
      imageUrl: matelas, // Replace with the actual image
      productCount: 2,
    },
    {
      title: 'Awesome Lip Care',
      imageUrl: oreillers, // Replace with the actual image
      productCount: 2,
    },
    {
      title: 'Facial Care',
      imageUrl: linge, // Replace with the actual image
      productCount: 2,
    },
  ]

  return (
    <section className='py-12'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h2 className='text-orange-500 font-medium mb-2'>
            Product Collection
          </h2>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>
            Discover our products
          </h1>
        </div>
        <Link
          to='/shop'
          className='text-gray-800 font-medium border px-4 py-2 rounded-lg hover:bg-gray-100 flex gap-2 items-center'
        >
          Shop All Products <FaArrowRight />
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-16'>
        {products.map((product, index) => (
          <div
            key={index}
            className='relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg hover:scale-110  transition-transform duration-500 hover:cursor-pointer'
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className='w-full h-full object-fill group-hover:scale-110 transition-transform duration-500'
            />
            <div className='absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4'>
              <h3 className='text-black text-lg font-bold'>{product.title}</h3>
              <small className='text-orange-500'>
                {product.productCount} Products
              </small>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductCollection
