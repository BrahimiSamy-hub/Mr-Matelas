import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { RadioGroup } from '@headlessui/react'
import Footer from '../component/Footer'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import {
  SingleProductProvider,
  useSingleProduct,
} from '../context/SingleProductContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SingleProductDetails = () => {
  const { productId } = useParams()

  return (
    <SingleProductProvider productId={productId}>
      <SingleProduct />
    </SingleProductProvider>
  )
}

const SingleProduct = () => {
  const { t, i18n } = useTranslation()
  const { product, isLoading, isError, error } = useSingleProduct()

  const [selectedImage, setSelectedImage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  // Update selectedImage and selectedColor when product data is loaded
  useEffect(() => {
    if (product) {
      if (
        product.images &&
        product.images.urls &&
        product.images.urls.length > 0
      ) {
        setSelectedImage(product.images.urls[0])
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0])
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0])
      }
    }
  }, [product])

  const handleImageChange = (url) => {
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedImage(url)
      setIsAnimating(false)
    }, 300) // Delay for fade-out and fade-in transition
  }

  const { addToCart } = useCart()
  const navigate = useNavigate()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  const languagePrefixes = {
    en: 'eng',
    fr: 'fr',
    ar: 'ar',
  }

  const currentLanguage = i18n.language
  const languagePrefix = languagePrefixes[currentLanguage] || 'eng'

  const productName = product[`${languagePrefix}Name`] || product.engName
  const productDescription =
    product[`${languagePrefix}Description`] || product.engDescription

  const handleAddToCart = (event) => {
    event.preventDefault()
    const item = {
      id: product._id,
      name: productName,
      price: selectedSize.price,
      imageSrc: selectedImage || '',
      imageAlt: productName,
      color: selectedColor || '',
      size: selectedSize || '',
    }
    addToCart(item)
  }

  const handleInstantBuy = (event) => {
    event.preventDefault()
    const item = {
      id: product._id,
      name: productName,
      price: selectedSize.price,
      imageSrc: selectedImage || '',
      imageAlt: productName,
      color: selectedColor || '',
      size: selectedSize || '',
    }
    addToCart(item)
    navigate('/checkout')
  }

  return (
    <>
      <section className='xl:sm:pl-16 pl-6 wide:sm:pr-16 pr-6 sm:pb-24 pb-12'>
        <div className='flex w-full items-center overflow-hidden bg-white pt-14'>
          <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
            {/* Image Gallery */}
            <div className='sm:col-span-4 lg:col-span-5'>
              <div className='flex flex-col'>
                {selectedImage ? (
                  <img
                    draggable='false'
                    src={selectedImage}
                    alt='Product image'
                    className={classNames(
                      'object-cover object-center h-[350px] rounded-lg bg-gray-100 transition-opacity duration-300',
                      isAnimating ? 'opacity-0' : 'opacity-100'
                    )}
                    loading='lazy'
                  />
                ) : (
                  <div className='object-contain object-center ounded-lg bg-gray-100 flex items-center justify-center'>
                    <span>{t('noImageAvailable')}</span>
                  </div>
                )}
                {/* Thumbnail Images */}
                {product.images &&
                  product.images.urls &&
                  product.images.urls.length > 0 && (
                    <div className='mt-4 space-x-2 flex justify-around'>
                      {product.images.urls.map((url, index) => (
                        <img
                          draggable='false'
                          key={index}
                          src={url}
                          alt={`${productName} ${index + 1}`}
                          className={classNames(
                            'h-24 w-24 object-contain rounded-md cursor-pointer border',
                            selectedImage === url
                              ? 'border-indigo-500'
                              : 'border-[#4241417a]'
                          )}
                          onClick={() => handleImageChange(url)}
                          loading='lazy'
                        />
                      ))}
                    </div>
                  )}
              </div>
            </div>

            {/* Product Details */}
            <div className='sm:col-span-8 lg:col-span-7'>
              <h2 className='text-5xl text-gray-900 flex justify-between'>
                <span className='font-bold'>{productName}</span>
                <small
                  className={classNames(
                    'text-xl border rounded p-2 flex text-center',
                    product.inStock
                      ? 'text-green-500 bg-green-500/15'
                      : 'text-red-500 bg-red-500/15'
                  )}
                >
                  {product.inStock ? t('inStock') : t('outOfStock')}
                </small>
              </h2>

              <div className='mt-2'>
                <p className='text-3xl text-gray-900 font-bold'>
                  {selectedSize.price}
                  <small>
                    <sup className='ml-1'>DA</sup>
                  </small>
                </p>
              </div>

              <div aria-labelledby='options-heading' className='mt-10'>
                <h3 id='options-heading' className='sr-only'>
                  {t('productOptions')}
                </h3>

                <form>
                  {/* Colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <h4 className='text-sm font-medium text-gray-900'>
                        {t('color')}
                      </h4>

                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className='mt-4'
                      >
                        <RadioGroup.Label className='sr-only'>
                          {t('chooseColor')}
                        </RadioGroup.Label>
                        <span className='flex items-center space-x-3'>
                          {product.colors.map((color, index) => (
                            <RadioGroup.Option
                              key={index}
                              value={color}
                              className={({ active, checked }) =>
                                classNames(
                                  active && checked
                                    ? 'ring ring-offset-1 ring-[#0a62a5] '
                                    : '',
                                  !active && checked
                                    ? 'ring-2 ring-[#0a62a5]  transition-transform duration-300'
                                    : '',
                                  'relative m-1 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none '
                                )
                              }
                            >
                              <RadioGroup.Label as='span' className='sr-only'>
                                {`${t('color')} ${color}`}
                              </RadioGroup.Label>
                              <span
                                aria-hidden='true'
                                style={{ backgroundColor: color }}
                                className='h-8 w-8 rounded-full border border-black border-opacity-10'
                              />
                            </RadioGroup.Option>
                          ))}
                        </span>
                      </RadioGroup>
                    </div>
                  )}

                  {/* Description */}
                  <div className='mt-10'>
                    <ul>
                      <li className='flex gap-1 font-bold'>
                        Type :{' '}
                        <p className='text-md font-medium'> {product.type}</p>
                      </li>
                      <li className='flex gap-1 font-bold'>
                        Nombre de places :{' '}
                        <p className='text-md font-medium'>
                          {product.spots} place(s)
                        </p>
                      </li>
                      <li className='flex gap-1 font-bold'>
                        Type :{' '}
                        <p className='text-md font-medium'>
                          {product.spotType}
                        </p>
                      </li>
                    </ul>
                    <p></p>
                    <p className='text-sm text-gray-700'></p>
                    <p className='text-sm text-gray-700'></p>
                  </div>
                  {productDescription && (
                    <div className='mt-10'>
                      <p className='text-sm text-gray-700'>
                        {productDescription}
                      </p>
                    </div>
                  )}

                  {/* Additional Attributes (Optional) */}
                  {/* Sizes */}
                  <div className='mt-10'>
                    <div className='flex items-center justify-between'>
                      <h4 className='text-sm font-medium text-gray-900'>
                        {t('size')}
                      </h4>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className='mt-4'
                    >
                      <RadioGroup.Label className='sr-only'>
                        {t('chooseSize')}
                      </RadioGroup.Label>
                      <div className='grid grid-cols-4 gap-4'>
                        {product?.sizes?.map((size) => (
                          <RadioGroup.Option
                            key={size._id}
                            value={size}
                            disabled={!size.inStock}
                            className={({ active }) =>
                              classNames(
                                size.inStock
                                  ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                  : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                active ? 'ring-2 ring-indigo-500' : '',
                                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as='span'>
                                  {size?.longeur &&
                                  size?.largeur &&
                                  size?.epesseur
                                    ? `${size?.longeur} * ${size?.largeur} * ${size?.epesseur}`
                                    : 'Invalid size'}
                                </RadioGroup.Label>

                                {size.inStock ? (
                                  <span
                                    className={classNames(
                                      active ? 'border' : 'border-2',
                                      checked
                                        ? 'border-indigo-500'
                                        : 'border-transparent',
                                      'pointer-events-none absolute -inset-px rounded-md'
                                    )}
                                    aria-hidden='true'
                                  />
                                ) : (
                                  <span
                                    aria-hidden='true'
                                    className='pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200'
                                  >
                                    <svg
                                      className='absolute inset-0 h-full w-full stroke-2 text-gray-200'
                                      viewBox='0 0 100 100'
                                      preserveAspectRatio='none'
                                      stroke='currentColor'
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect='non-scaling-stroke'
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type='submit'
                    className={`mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-[#0a62a5] px-8 py-3 text-base font-medium text-white hover:opacity-75 ${
                      product.sizes.every((size) => !size.inStock)
                        ? 'opacity-25 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={handleAddToCart}
                    disabled={product.sizes.every((size) => !size.inStock)}
                  >
                    {product.sizes.every((size) => !size.inStock)
                      ? t('outOfStock')
                      : t('addToCart')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default SingleProductDetails
