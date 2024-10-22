import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Footer from '../component/Footer'
import { FaCircleCheck, FaSpinner } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useOrder } from '../context/OrderContext' // Import the Order context
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import wilayaMap from '../constant/wilaya.json'
import i18n from 'i18next'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { t } = useTranslation()
  const { cartItems, clearCart } = useCart()
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (cartItems.length === 0 && !isSuccess) {
      navigate('/shop')
    }
  }, [cartItems, navigate, isSuccess])
  const { createOrderMutation, isLoading, wilayas } = useOrder() // Use order context

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    )
  }

  // shipping type

  const [selectedShippingType, setSelectedShippingType] = useState('')

  const handleChange = (e) => {
    setSelectedShippingType(e.target.value)

    // Recalculate delivery fee when shipping type changes
    if (selectedWilaya) {
      const newIndex = Number(selectedWilaya) - 1 // Use selectedWilaya to get the index

      const selectedWilayaDelivery =
        e.target.value === 'home'
          ? wilayas[newIndex]?.homePrice || 0
          : e.target.value === 'desk'
          ? wilayas[newIndex]?.deskPrice || 0
          : 0 // Default to 0 if neither type is selected

      setDelivery(selectedWilayaDelivery)
    }
  }

  const [selectedWilaya, setSelectedWilaya] = useState('')
  const [communes, setCommunes] = useState([])
  const [delivery, setDelivery] = useState(0)

  console.log(selectedShippingType)

  const handleWilayaChange = (event) => {
    const wilayaCode = event.target.value
    setSelectedWilaya(wilayaCode)

    // Filter communes based on the selected wilaya
    const filteredCommunes = wilayaMap.filter(
      (wilaya) => wilaya.wilaya_code === wilayaCode
    )
    setCommunes(filteredCommunes)

    // Update the delivery fee based on the selected wilaya

    const newIndex = Number(wilayaCode) - 1

    const selectedWilayaDelivery =
      selectedShippingType === 'home'
        ? wilayas[newIndex]?.homePrice || 0
        : selectedShippingType === 'desk'
        ? wilayas[newIndex]?.deskPrice || 0
        : 0 // Default to 0 if neither type is selected

    setDelivery(selectedWilayaDelivery)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // On form submit, prepare the order data
  const onSubmit = (data) => {
    // Prepare orderItems based on the cart
    const orderItems = cartItems.map((product) => ({
      product: product.id, // Assuming product._id is the product ID
      quantity: product.quantity,
      price: product.price,
      hex: product.color,
      longeur: product.size?.longeur,
      largeur: product.size?.largeur,
      epesseur: product.size?.epesseur,
    }))

    // Construct the full order data
    const orderData = {
      fullName: data.name,
      address: data.address,
      wilaya: data.wilaya,
      commune: data.commune,
      phoneNumber1: data.mobileNumber,
      phoneNumber2: data.mobileNumber2 || '', // Optional field
      shippingType: data.shippingMethod, // home or desk
      total: calculateSubtotal(),
      shippingPrice: delivery,
      orderItems,
    }

    // Send the order using createOrderMutation
    createOrderMutation(orderData, {
      onSuccess: () => {
        setIsSuccess(true)
        clearCart()
      },
      onError: (error) => {
        console.log(orderData)

        // Handle error (e.g., show an error message)
        console.error('Error placing order:', error)
      },
    })
  }

  const uniqueWilayas = wilayaMap.reduce((acc, current) => {
    const x = acc.find((item) => item.wilaya_code === current.wilaya_code)
    if (!x) {
      return acc.concat([current])
    } else {
      return acc
    }
  }, [])

  return (
    <>
      <section className='container min-h-screen'>
        <div className='flex flex-col gap-10 sm:flex-row py-10'>
          {isSuccess ? (
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
                  autoComplete='new-name'
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
                  autoComplete='new-email'
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
                  autoComplete='new-tel'
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
                  autoComplete='new-tel'
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
                  onChange={handleWilayaChange}
                >
                  <option value='' disabled>
                    {t('selectAWilaya')}
                  </option>
                  {uniqueWilayas.map((wilaya) => (
                    <option key={wilaya.id} value={wilaya.wilaya_code}>
                      {`${wilaya.wilaya_code} - ${
                        i18n.language === 'ar'
                          ? wilaya.wilaya_name
                          : wilaya.wilaya_name_ascii
                      }`}
                    </option>
                  ))}
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
                  disabled={!selectedWilaya}
                >
                  <option value='' disabled>
                    {t('selectCommune')}
                  </option>
                  {communes.map((commune) => (
                    <option key={commune.id} value={commune.commune_name_ascii}>
                      {i18n.language === 'ar'
                        ? commune.commune_name
                        : commune.commune_name_ascii}
                    </option>
                  ))}
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
                  autoComplete='new-address'
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
                    id='home'
                    {...register('shippingMethod', {
                      required: t('shippingMethodRequired'),
                    })}
                    value='home'
                    className='mr-2'
                    onChange={handleChange}
                  />
                  <label htmlFor='home'>{t('home')}</label>
                </div>
                <div className='flex items-center mb-2'>
                  <input
                    type='radio'
                    id='desk'
                    {...register('shippingMethod', {
                      required: t('shippingMethodRequired'),
                    })}
                    value='desk'
                    className='mr-2'
                    onChange={handleChange}
                  />
                  <label htmlFor='desk'>{t('desk')}</label>
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
                  {cartItems.map((product, index) => (
                    <li key={index} className='flex py-6'>
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
                          <div className='flex-row mt-1 text-md text-gray-500 mr-2'>
                            <div
                              style={{ backgroundColor: product.color }}
                              className='justify-center w-6 h-6 mb-1 rounded-full border border-gray-300'
                            ></div>
                            {product.size?.longeur} * {product.size?.largeur} *{' '}
                            {product.size?.epesseur}
                          </div>
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
                      {calculateSubtotal()}
                      <small className='ml-1'>
                        <sup>DA</sup>
                      </small>
                    </p>
                  </div>
                  <div className='flex justify-between text-base font-medium'>
                    <p>{t('delivery')}</p>
                    <p>
                      {delivery}
                      <small className='ml-1'>
                        <sup>DA</sup>
                      </small>
                    </p>
                  </div>
                  <hr />
                  <div className='flex justify-between text-base font-medium'>
                    <p>{t('total')}</p>
                    <p>
                      {calculateSubtotal() + delivery}
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
