import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Footer from '../component/Footer'
import { FaCircleCheck, FaSpinner } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTranslation } from 'react-i18next'

const Checkout = () => {
  const { t } = useTranslation()
  const { cartItems } = useCart()
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const calculateTotal = (products) => {
    const subtotal = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
    const delivery = 400
    const total = subtotal + delivery
    return { subtotal, delivery, total }
  }

  const onSubmit = (data) => {
    setIsLoading(true)
    const { subtotal, delivery, total } = calculateTotal(cartItems)
    const emailData = {
      ...data,
      cartItems: cartItems.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        total: product.price * product.quantity,
      })),
      subtotal,
      delivery,
      total,
      cartItemsHtml: cartItems
        .map(
          (product) => `
            <tr>
              <td>${product.name}</td>
              <td>${product.quantity}</td>
              <td>${product.price} <sup className=''><small>DA</small></sup></td>
            </tr>`
        )
        .join(''),
    }

    // Simulate successful order submission
    setTimeout(() => {
      setIsLoading(false)
      setIsOrderSuccessful(true)
    }, 2000)
  }

  return (
    <>
      <section className='container min-h-screen'>
        <div className='flex flex-col gap-10 sm:flex-row py-10'>
          {isOrderSuccessful ? (
            <div className='w-full min-h-[450px] border p-4 rounded-xl flex flex-col justify-center items-center gap-6'>
              <FaCircleCheck color='green' size={80} />
              <h2 className='font-bold text-3xl leading-10 text-center uppercase'>
                {t('orderCompletedSuccessfully')}
              </h2>
              <p className='font-normal text-lg leading-8 text-gray-500 text-center uppercase'>
                {t('thankYou')}
              </p>
              <button className='border border-[#0a62a5] py-2 px-4 rounded bg-[#0a62a5] text-white font-bold hover:opacity-75'>
                <Link to='/shop' draggable='false'>
                  {t('goBackToShop')}
                </Link>
              </button>
            </div>
          ) : (
            <form
              className='w-full border p-4 rounded-xl'
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className='text-2xl font-semibold mb-4 text-center'>
                {t('checkout')}
              </h2>

              {/* Form fields for name, email, mobile number, wilaya, shipping method */}
              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-medium'
                  htmlFor='name'
                >
                  {t('name')}
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='name'
                  {...register('name', { required: t('nameRequired') })}
                  className={`w-full px-4 py-3 border rounded-md bg-white focus:border-white ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  placeholder={t('enterName')}
                />
                {errors.name && (
                  <p className='text-red-500 text-sm'>{errors.name.message}</p>
                )}
              </div>

              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-medium'
                  htmlFor='email'
                >
                  {t('email')}
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  id='email'
                  {...register('email', { required: t('emailRequired') })}
                  className={`w-full px-4 py-3 border rounded-md bg-white focus:border-white ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  placeholder={t('enterEmail')}
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email.message}</p>
                )}
              </div>

              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-medium'
                  htmlFor='mobileNumber'
                >
                  {t('mobileNumber')}
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type='tel'
                  id='mobileNumber'
                  {...register('mobileNumber', {
                    required: t('mobileNumberRequired'),
                    pattern: {
                      value: /^(05|06|07)[0-9]{8}$/,
                      message: t('invalidMobileNumberFormat'),
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-md bg-white focus:border-white ${
                    errors.mobileNumber ? 'border-red-500' : ''
                  }`}
                  placeholder={t('enterMobileNumber')}
                />
                {errors.mobileNumber && (
                  <p className='text-red-500 text-sm'>
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>

              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-medium'
                  htmlFor='mobileNumber2'
                >
                  {t('mobilePhone2')}
                </label>
                <input
                  type='tel'
                  id='mobileNumber2'
                  {...register('mobileNumber2', {
                    pattern: {
                      value: /^(05|06|07)[0-9]{8}$/,
                      message: t('invalidMobileNumberFormat'),
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-md bg-white focus:border-white ${
                    errors.mobileNumber2 ? 'border-red-500' : ''
                  }`}
                  placeholder={t('enterMobileNumber2')}
                />
                {errors.mobileNumber2 && (
                  <p className='text-red-500 text-sm'>
                    {errors.mobileNumber2.message}
                  </p>
                )}
              </div>

              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-medium'
                  htmlFor='wilaya'
                >
                  {t('wilaya')}
                  <span className='text-red-500'>*</span>
                </label>
                <select
                  id='wilaya'
                  {...register('wilaya', { required: t('wilayaRequired') })}
                  defaultValue=''
                  className={`pl-3 py-3 border rounded-md bg-white text-gray-500 focus:border-white ${
                    errors.wilaya ? 'border-red-500' : ''
                  }`}
                >
                  <option value='' disabled>
                    {t('selectAWilaya')}
                  </option>
                  {/* Add actual wilaya options here */}
                  <option value='d'>ds</option>
                </select>
                {errors.wilaya && (
                  <p className='text-red-500 text-sm'>
                    {errors.wilaya.message}
                  </p>
                )}
              </div>

              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-medium'
                  htmlFor='commune'
                >
                  {t('commune')}
                  <span className='text-red-500'>*</span>
                </label>
                <select
                  id='commune'
                  {...register('commune', { required: t('CommuneRequired') })}
                  defaultValue=''
                  className={`pl-3 py-3 border rounded-md bg-white text-gray-500 focus:border-white ${
                    errors.commune ? 'border-red-500' : ''
                  }`}
                >
                  <option value='' disabled>
                    {t('selectCommune')}
                  </option>
                  {/* Add actual commune options here */}
                  <option value='d'>ds</option>
                </select>
                {errors.commune && (
                  <p className='text-red-500 text-sm'>
                    {errors.commune.message}
                  </p>
                )}
              </div>

              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-medium'
                  htmlFor='address'
                >
                  {t('adress')}
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='address'
                  {...register('address', { required: t('adressRequired') })}
                  className={`w-full px-4 py-3 border rounded-md bg-white focus:border-white ${
                    errors.address ? 'border-red-500' : ''
                  }`}
                  placeholder={t('enterAddress')}
                />
                {errors.address && (
                  <p className='text-red-500 text-sm'>
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>
                  {t('shippingMethod')}
                  <span className='text-red-500'>*</span>
                </label>
                <div className='flex items-center mb-2'>
                  <input
                    type='radio'
                    id='homeDelivery'
                    {...register('shippingMethod', {
                      required: t('shippingMethodRequired'),
                    })}
                    value='homeDelivery'
                    className='mr-2'
                  />
                  <label htmlFor='homeDelivery'>{t('home')}</label>
                </div>
                <div className='flex items-center mb-2'>
                  <input
                    type='radio'
                    id='pickup'
                    {...register('shippingMethod', {
                      required: t('shippingMethodRequired'),
                    })}
                    value='pickup'
                    className='mr-2'
                  />
                  <label htmlFor='pickup'>{t('desk')}</label>
                </div>
                {errors.shippingMethod && (
                  <p className='text-red-500 text-sm'>
                    {errors.shippingMethod.message}
                  </p>
                )}
              </div>

              <button
                type='submit'
                className={`w-full py-2 mt-4 text-white rounded-md bg-[#0a62a5] hover:opacity-75 ${
                  isLoading || cartItems.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : ''
                }`}
                disabled={isLoading || cartItems.length === 0}
              >
                {isLoading ? (
                  <FaSpinner className='animate-spin' />
                ) : (
                  t('submit')
                )}
              </button>
            </form>
          )}
          {/* Cart section */}
          <div className='w-full border p-4 rounded-xl'>
            <h2 className='text-2xl font-semibold mb-4 text-center'>
              {t('cart')}
            </h2>
            <div className='mt-8'>
              <div className='flow-root'>
                <ul
                  role='list'
                  className='-my-6 divide-y divide-gray-200 max-h-[400px] overflow-y-auto'
                >
                  {cartItems.map((product) => (
                    <li key={product.id} className='flex py-6'>
                      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                        <img
                          draggable='false'
                          loading='lazy'
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className='h-full w-full object-contain object-center'
                        />
                      </div>

                      <div className='ml-4 flex flex-1 flex-col'>
                        <div>
                          <div className='flex justify-between text-base font-medium mr-2 '>
                            <h3>{product.name}</h3>
                            <p className='ml-4'>
                              {product.price}
                              <small>
                                <sup>DA</sup>
                              </small>
                            </p>
                          </div>
                          <p className='flex-row mt-1 text-md text-gray-500 mr-2'>
                            <div
                              style={{ backgroundColor: product.color }}
                              className='justify-center w-6 h-6 mb-1 rounded-full border border-gray-300'
                            ></div>
                            {product.size?.longeur} * {product.size?.largeur} *{' '}
                            {product.size?.epesseur}
                          </p>
                        </div>
                        <div className='flex flex-1 items-end justify-between text-md mr-2'>
                          <p className='text-gray-500'>
                            {t('qty')} x{product.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Make this section sticky */}
                <div className='border-t border-gray-200 px-4 py-6 sm:px-6 mt-10 bg-white'>
                  <div className='flex justify-between text-base font-medium'>
                    <p>{t('subtotal')}</p>
                    <p>
                      3500
                      <small className='ml-1'>
                        <sup>DA</sup>
                      </small>
                    </p>
                  </div>
                  <div className='flex justify-between text-base font-medium'>
                    <p>{t('delivery')}</p>
                    <p>
                      400
                      <small className='ml-1'>
                        <sup>DA</sup>
                      </small>
                    </p>
                  </div>
                  <hr />
                  <div className='flex justify-between text-base font-medium'>
                    <p>{t('total')}</p>
                    <p>
                      3900
                      <small className='ml-1'>
                        <sup>DA</sup>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Checkout
