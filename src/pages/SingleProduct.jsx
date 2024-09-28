import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useCart } from '../context/CartContext'
import Footer from '../component/Footer'
import { useTranslation } from 'react-i18next'

const product = {
  name: 'Shirt2',
  price: '3500',
  href: '#',
  imageSrc:
    'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
  imageAlt: 'Shirt',
  stock: true,
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: 'XXL', inStock: true },
    { name: 'XXXL', inStock: false },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SingleProduct = () => {
  const { t } = useTranslation()
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const { addToCart } = useCart()

  const handleAddToCart = (event) => {
    event.preventDefault()
    const item = {
      id: product.name,
      name: product.name,
      price: product.price,
      color: selectedColor.name,
      size: selectedSize.name,
      imageSrc: product.imageSrc,
      imageAlt: product.imageAlt,
    }
    addToCart(item)
  }

  return (
    <>
      <section>
        <div className='flex w-full items-center overflow-hidden bg-white pt-14'>
          <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
            <div className='sm:col-span-4 aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100'>
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className='object-cover object-center'
                loading='lazy'
              />
            </div>
            <div className='sm:col-span-8 lg:col-span-7'>
              <h2 className='text-4xl text-gray-900 flex justify-between'>
                <span className='font-bold'>{product.name}</span>
                <small
                  className={classNames(
                    'text-xl border rounded p-2 flex text-center',
                    product.stock
                      ? 'text-green-500 bg-green-500/15'
                      : 'text-red-500 bg-red-500/15'
                  )}
                >
                  {product.stock ? t('inStock') : t('outOfStock')}
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
                        {product.colors.map((color) => (
                          <RadioGroup.Option
                            key={color.name}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                color.selectedClass,
                                active && checked ? 'ring ring-offset-1' : '',
                                !active && checked ? 'ring-2' : '',
                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                              )
                            }
                          >
                            <RadioGroup.Label as='span' className='sr-only'>
                              {color.name}
                            </RadioGroup.Label>
                            <span
                              aria-hidden='true'
                              className={classNames(
                                color.class,
                                'h-8 w-8 rounded-full border border-black border-opacity-10'
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </span>
                    </RadioGroup>
                  </div>

                  <div className='mt-10'>
                    <small className='font-bold'>
                      {t('productDescription')}
                    </small>
                  </div>

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
                        {product.sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
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
                                  {size.name}
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

                  <button
                    type='submit'
                    className={`mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:opacity-75  ${
                      !product.stock && 'opacity-25 cursor-not-allowed'
                    }`}
                    onClick={handleAddToCart}
                    disabled={!product.stock}
                  >
                    {product.stock ? t('addToCart') : t('outOfStock')}
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

export default SingleProduct
