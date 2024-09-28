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
      price: product.price,
      imageSrc: selectedImage || '',
      imageAlt: productName,
    }
    addToCart(item)
  }

  const handleInstantBuy = (event) => {
    event.preventDefault()
    const item = {
      id: product._id,
      name: productName,
      price: product.price,
      imageSrc: selectedImage || '',
      imageAlt: productName,
    }
    addToCart(item)
    navigate('/checkout')
  }

  return (
    <>
      <section>
        <div className='flex w-full items-center overflow-hidden bg-white pt-14'>
          <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
            {/* Image Gallery */}
            <div className='sm:col-span-4 lg:col-span-5'>
              <div className='flex flex-col'>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt='Product image'
                    className={classNames(
                      'object-contain object-center h-[500px] rounded-lg bg-gray-100 transition-opacity duration-300',
                      isAnimating ? 'opacity-0' : 'opacity-100'
                    )}
                    loading='lazy'
                  />
                ) : (
                  <div className='object-contain object-center h-[500px] rounded-lg bg-gray-100 flex items-center justify-center'>
                    <span>{t('noImageAvailable')}</span>
                  </div>
                )}
                {/* Thumbnail Images */}
                {product.images &&
                  product.images.urls &&
                  product.images.urls.length > 0 && (
                    <div className='mt-4 flex space-x-2'>
                      {product.images.urls.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`${productName} ${index + 1}`}
                          className={classNames(
                            'h-16 w-16 object-cover rounded-md cursor-pointer border',
                            selectedImage === url
                              ? 'border-indigo-500'
                              : 'border-transparent'
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
              <h2 className='text-4xl text-gray-900 flex justify-between'>
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
                <p className='text-2xl text-gray-900 font-bold'>
                  {product.price}
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
                                    ? 'ring ring-offset-1 ring-indigo-500 '
                                    : '',
                                  !active && checked
                                    ? 'ring-2 ring-indigo-500 focus:scale-110 transition-transform duration-300'
                                    : '',
                                  'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none '
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
                  {productDescription && (
                    <div className='mt-10'>
                      <p className='text-sm text-gray-700'>
                        {productDescription}
                      </p>
                    </div>
                  )}

                  {/* Additional Attributes (Optional) */}
                  {/* Example: Dimensions */}
                  {(product.sizes.longeur ||
                    product.sizes.largeur ||
                    product.sizes.epesseur) && (
                    <div className='mt-10'>
                      <h4 className='text-sm font-medium text-gray-900'>
                        {t('dimensions')}
                      </h4>
                      <div className='mt-2 flex space-x-4'>
                        {product.longeur && (
                          <div>
                            <span className='block text-sm font-medium text-gray-700'>
                              {t('length')}
                            </span>
                            <span className='block text-sm text-gray-900'>
                              {product.longeur} cm
                            </span>
                          </div>
                        )}
                        {product.largeur && (
                          <div>
                            <span className='block text-sm font-medium text-gray-700'>
                              {t('width')}
                            </span>
                            <span className='block text-sm text-gray-900'>
                              {product.largeur} cm
                            </span>
                          </div>
                        )}
                        {product.epesseur && (
                          <div>
                            <span className='block text-sm font-medium text-gray-700'>
                              {t('thickness')}
                            </span>
                            <span className='block text-sm text-gray-900'>
                              {product.epesseur} cm
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    type='submit'
                    className={`mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:opacity-75  ${
                      !product.inStock && 'opacity-25 cursor-not-allowed'
                    }`}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? t('addToCart') : t('outOfStock')}
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
