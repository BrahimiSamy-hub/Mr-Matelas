import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { MdDelete } from 'react-icons/md'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Cart = () => {
  const { t } = useTranslation()
  const { isOpen, toggleCart, cartItems, removeFromCart } = useCart()

  const calculateSubtotal = () => {
    return cartItems
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2)
  }

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog className='relative z-50' onClose={toggleCart}>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 ' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden '>
            <div className='absolute inset-0 overflow-hidden '>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 '>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-300 sm:duration-400'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-300 sm:duration-400'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-md  '>
                    <div className='flex h-full flex-col bg-white shadow-xl '>
                      <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6 '>
                        <div className='flex items-start justify-between '>
                          <Dialog.Title className='text-lg font-medium  '>
                            {t('shoppingCart')}
                          </Dialog.Title>
                          <div className='ml-3 flex h-7 items-center'>
                            <button
                              type='button'
                              className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                              onClick={toggleCart}
                            >
                              <span className='absolute -inset-0.5' />
                              <span className='sr-only'>{t('closePanel')}</span>
                              <XMarkIcon
                                className='h-6 w-6'
                                aria-hidden='true'
                              />
                            </button>
                          </div>
                        </div>

                        <div className='mt-8'>
                          <div className='flow-root'>
                            <ul
                              role='list'
                              className='-my-6 divide-y divide-gray-200'
                            >
                              {cartItems.map((product, index) => (
                                <li key={index} className='flex py-6'>
                                  <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                    <img
                                      draggable='false'
                                      src={product.imageSrc}
                                      alt={t(product.imageAlt)}
                                      className='h-full w-full object-cover object-center'
                                    />
                                  </div>

                                  <div className='ml-4 flex flex-1 flex-col'>
                                    <div>
                                      <div className='flex justify-between text-base font-medium mr-2'>
                                        <h3>{t(product.name)} </h3>
                                        <p className='ml-4'>
                                          {product.price}{' '}
                                          <small>
                                            {' '}
                                            <sup> {t('devise')}</sup>
                                          </small>
                                        </p>
                                      </div>
                                      <div className=' flex-row mt-1 text-sm text-gray-500 mr-2'>
                                        <div
                                          style={{
                                            backgroundColor: product.color,
                                          }}
                                          className='justify-center w-6 h-6 mb-1 rounded-full border border-gray-300 mr-2'
                                        ></div>
                                        {product.size?.longeur} *{' '}
                                        {product.size?.largeur} *{' '}
                                        {product.size?.epesseur}
                                      </div>
                                    </div>
                                    <div className='flex flex-1 -mt-2 items-end justify-between text-sm mr-2'>
                                      <p className='text-gray-500'>
                                        {t('qty')} x{product.quantity}
                                      </p>

                                      <div className='flex hover:opacity-75'>
                                        <button
                                          type='button'
                                          className='font-medium text-red-500 rounded'
                                          onClick={() =>
                                            removeFromCart(
                                              product.id,
                                              product.size,
                                              product.color
                                            )
                                          }
                                        >
                                          <MdDelete size={30} />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                        <div className='flex justify-between text-base font-medium '>
                          <p>{t('subtotal')}</p>
                          <p>
                            {calculateSubtotal()}{' '}
                            <small>
                              <sup>{t('devise')}</sup>
                            </small>
                          </p>
                        </div>
                        <p className='mt-0.5 text-sm text-gray-500'>
                          {t('shippingCalculatedAtCheckout')}
                        </p>
                        <div className='mt-6'>
                          <Link
                            draggable='false'
                            to={cartItems.length > 0 ? '/checkout' : '#'}
                            className={`flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-sm ${
                              cartItems.length === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#0a62a5] text-white hover:opacity-75'
                            }`}
                            onClick={
                              cartItems.length > 0
                                ? toggleCart
                                : (e) => e.preventDefault()
                            }
                            disabled={cartItems.length === 0}
                          >
                            {t('checkout')}
                          </Link>
                        </div>

                        <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                          <p>
                            {t('or')}{' '}
                            <Link to='/' draggable='false'>
                              <button
                                type='button'
                                className='font-medium text-color-1 hover:text-[#0a62a5]'
                                onClick={toggleCart}
                              >
                                {t('continueShopping')}
                                <span aria-hidden='true'> &rarr;</span>
                              </button>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Cart
