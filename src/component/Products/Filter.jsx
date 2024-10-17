import { useState } from 'react'
import { useTranslation } from 'react-i18next' // Import i18n hook
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { FunnelIcon } from '@heroicons/react/20/solid'
import Product from '../../pages/Product'
import { useCategories } from '../../context/CategoriesContext'
import { useProducts } from '../../context/ProductContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { categories } = useCategories() // Fetch the categories from CategoriesContext
  const { category, setCategory } = useProducts() // Get category from context and setCategory function
  const { t, i18n } = useTranslation() // Use i18n

  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId === 'all' ? '' : categoryId)
  }

  const getCategoryName = (category) => {
    if (i18n.language === 'fr') {
      return category.frName
    } else if (i18n.language === 'ar') {
      return category.arName
    } else {
      return category.engName
    }
  }

  return (
    <div className=''>
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className='relative z-40 lg:hidden'
        >
          <DialogBackdrop
            transition
            className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
          />
          <div className='fixed inset-0 z-40 flex'>
            <DialogPanel
              transition
              className='relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full'
            >
              <div className='flex items-center justify-between px-4'>
                <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                <button
                  type='button'
                  onClick={() => setMobileFiltersOpen(false)}
                  className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                >
                  <span className='sr-only'>Close menu</span>
                  <XMarkIcon aria-hidden='true' className='h-6 w-6' />
                </button>
              </div>

              {/* Filters */}
              <form className='mt-4 border-t border-gray-200'>
                <h3 className='sr-only'>{t('categories')}</h3>
                <Disclosure
                  defaultOpen={true}
                  as='div'
                  className='border-t border-gray-200 px-4 py-6'
                >
                  <h3 className='-mx-2 -my-3 flow-root'>
                    <DisclosureButton className='group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                      <span className='font-medium text-gray-900'>
                        {t('categories')}
                      </span>
                      <span className='ml-6 flex items-center'>
                        <PlusIcon
                          aria-hidden='true'
                          className='h-5 w-5 group-data-[open]:hidden'
                        />
                        <MinusIcon
                          aria-hidden='true'
                          className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className='pt-6'>
                    <div className='space-y-6'>
                      {/* Dynamic categories */}
                      {categories?.map((cat) => (
                        <div key={cat._id} className='flex items-center'>
                          <input
                            type='radio'
                            id={`filter-mobile-${cat._id}`}
                            name='category'
                            className='h-4 w-4 rounded border-gray-300 text-[#0a62a5] focus:ring-[#0a62a5]'
                            onChange={() => handleCategoryChange(cat._id)}
                            checked={cat._id === category}
                          />
                          <label
                            htmlFor={`filter-mobile-${cat._id}`}
                            className='ml-3 min-w-0 flex-1 text-gray-500'
                          >
                            {getCategoryName(cat)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className='max-w-7xl'>
          <div className='flex items-baseline justify-between mt-20'>
            <div className='text-4xl font-bold tracking-tight text-gray-900'></div>
            <div className='flex items-center'>
              <button
                type='button'
                onClick={() => setMobileFiltersOpen(true)}
                className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
              >
                <span className='sr-only'>Filters</span>
                <div className='flex gap-2 justify-center items-center '>
                  <span className='font-bold text-2xl'>Filter</span>
                  <FunnelIcon aria-hidden='true' className='h-10 w-10' />
                </div>
              </button>
            </div>
          </div>

          <div aria-labelledby='products-heading' className='pb-24'>
            <h2 id='products-heading' className='sr-only'>
              Products
            </h2>
            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
              {/* Filters */}
              <form className='hidden lg:block'>
                <h3 className='sr-only'>Categories</h3>
                <Disclosure
                  defaultOpen={true}
                  as='div'
                  className='border-b border-gray-200 py-6'
                >
                  <h3 className='-my-3 flow-root'>
                    <DisclosureButton className='group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
                      <span className='font-medium text-gray-900'>
                        {t('categories')}
                      </span>
                      <span className='ml-6 flex items-center'>
                        <PlusIcon
                          aria-hidden='true'
                          className='h-5 w-5 group-data-[open]:hidden'
                        />
                        <MinusIcon
                          aria-hidden='true'
                          className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className='pt-6'>
                    <div className='space-y-4'>
                      {categories?.map((cat) => (
                        <div key={cat._id} className='flex items-center'>
                          <input
                            type='radio'
                            id={`filter-${cat._id}`}
                            name='category'
                            className='h-4 w-4 rounded border-gray-300 text-[#0a62a5] focus:ring-[#0a62a5]'
                            onChange={() => handleCategoryChange(cat._id)}
                            checked={cat._id === category}
                          />
                          <label
                            htmlFor={`filter-${cat._id}`}
                            className='ml-3 text-sm text-gray-600'
                          >
                            {getCategoryName(cat)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className='lg:col-span-3'>
                <Product />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
