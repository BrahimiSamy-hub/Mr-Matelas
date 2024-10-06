// import { useState } from 'react'
// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
// } from '@headlessui/react'
// import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
// import { FunnelIcon } from '@heroicons/react/20/solid'
// import Product from '../../pages/Product'
// import { useCategories } from '../../context/CategoriesContext'
// import { useProducts } from '../../context/ProductContext'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function App() {
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
//   const { categories } = useCategories() // Fetch the categories from CategoriesContext
//   const { setCategory } = useProducts()

//   const handleCategoryChange = (categoryId) => {
//     setCategory(categoryId)
//   }

//   return (
//     <div className=''>
//       <div>
//         {/* Mobile filter dialog */}
//         <Dialog
//           open={mobileFiltersOpen}
//           onClose={setMobileFiltersOpen}
//           className='relative z-40 lg:hidden'
//         >
//           <DialogBackdrop
//             transition
//             className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
//           />

//           <div className='fixed inset-0 z-40 flex'>
//             <DialogPanel
//               transition
//               className='relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full'
//             >
//               <div className='flex items-center justify-between px-4'>
//                 <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
//                 <button
//                   type='button'
//                   onClick={() => setMobileFiltersOpen(false)}
//                   className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
//                 >
//                   <span className='sr-only'>Close menu</span>
//                   <XMarkIcon aria-hidden='true' className='h-6 w-6' />
//                 </button>
//               </div>

//               {/* Filters */}
//               <form className='mt-4 border-t border-gray-200'>
//                 <h3 className='sr-only'>Categories</h3>
//                 <Disclosure
//                   defaultOpen={true}
//                   as='div'
//                   className='border-t border-gray-200 px-4 py-6'
//                 >
//                   <h3 className='-mx-2 -my-3 flow-root'>
//                     <DisclosureButton className='group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
//                       <span className='font-medium text-gray-900'>
//                         Categories
//                       </span>
//                       <span className='ml-6 flex items-center'>
//                         <PlusIcon
//                           aria-hidden='true'
//                           className='h-5 w-5 group-data-[open]:hidden'
//                         />
//                         <MinusIcon
//                           aria-hidden='true'
//                           className='h-5 w-5 [.group:not([data-open])_&]:hidden'
//                         />
//                       </span>
//                     </DisclosureButton>
//                   </h3>
//                   <DisclosurePanel className='pt-6'>
//                     <div className='space-y-6'>
//                       {categories?.map((category) => (
//                         <div key={category._id} className='flex items-center'>
//                           <input
//                             type='radio'
//                             id={`filter-mobile-${category._id}`}
//                             name='category'
//                             className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black'
//                             onChange={() => handleCategoryChange(category._id)} // Set the category when clicked
//                           />
//                           <label
//                             htmlFor={`filter-mobile-${category._id}`}
//                             className='ml-3 min-w-0 flex-1 text-gray-500'
//                           >
//                             {category.frName}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </DisclosurePanel>
//                 </Disclosure>
//               </form>
//             </DialogPanel>
//           </div>
//         </Dialog>

//         <main className='max-w-7xl'>
//           <div className='flex items-baseline justify-between pb-6 mt-10'>
//             <div className='text-4xl font-bold tracking-tight text-gray-900'></div>

//             <div className='flex items-center'>
//               <button
//                 type='button'
//                 onClick={() => setMobileFiltersOpen(true)}
//                 className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
//               >
//                 <span className='sr-only'>Filters</span>
//                 <FunnelIcon aria-hidden='true' className='h-5 w-5' />
//               </button>
//             </div>
//           </div>

//           <div aria-labelledby='products-heading' className='pb-24 pt-6'>
//             <h2 id='products-heading' className='sr-only'>
//               Products
//             </h2>

//             <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
//               {/* Filters */}
//               <form className='hidden lg:block'>
//                 <h3 className='sr-only'>Categories</h3>
//                 <Disclosure
//                   defaultOpen={true}
//                   as='div'
//                   className='border-b border-gray-200 py-6'
//                 >
//                   <h3 className='-my-3 flow-root'>
//                     <DisclosureButton className='group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
//                       <span className='font-medium text-gray-900'>
//                         Categories
//                       </span>
//                       <span className='ml-6 flex items-center'>
//                         <PlusIcon
//                           aria-hidden='true'
//                           className='h-5 w-5 group-data-[open]:hidden'
//                         />
//                         <MinusIcon
//                           aria-hidden='true'
//                           className='h-5 w-5 [.group:not([data-open])_&]:hidden'
//                         />
//                       </span>
//                     </DisclosureButton>
//                   </h3>
//                   <DisclosurePanel className='pt-6'>
//                     <div className='space-y-4'>
//                       {categories?.map((category) => (
//                         <div key={category._id} className='flex items-center'>
//                           <input
//                             type='radio'
//                             id={`filter-${category._id}`}
//                             name='category'
//                             className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
//                             onChange={() => handleCategoryChange(category._id)} // Set category ID on change
//                           />
//                           <label
//                             htmlFor={`filter-${category._id}`}
//                             className='ml-3 text-sm text-gray-600'
//                           >
//                             {category.frName}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </DisclosurePanel>
//                 </Disclosure>
//               </form>

//               {/* Product grid */}
//               <div className='lg:col-span-3'>
//                 <Product />
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
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

  const handleCategoryChange = (categoryId) => {
    // If categoryId is "all", set the category to an empty string for all products
    setCategory(categoryId === 'all' ? '' : categoryId)
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
                <h3 className='sr-only'>Categories</h3>
                <Disclosure
                  defaultOpen={true}
                  as='div'
                  className='border-t border-gray-200 px-4 py-6'
                >
                  <h3 className='-mx-2 -my-3 flow-root'>
                    <DisclosureButton className='group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                      <span className='font-medium text-gray-900'>
                        Categories
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
                      {/* Static "All" category */}
                      <div className='flex items-center'>
                        <input
                          type='radio'
                          id='filter-mobile-all'
                          name='category'
                          className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black'
                          onChange={() => handleCategoryChange('all')} // Handle the "All" selection
                          checked={category === ''} // Checked if category is empty (all)
                        />
                        <label
                          htmlFor='filter-mobile-all'
                          className='ml-3 min-w-0 flex-1 text-gray-500'
                        >
                          All
                        </label>
                      </div>

                      {/* Dynamic categories */}
                      {categories?.map((cat) => (
                        <div key={cat._id} className='flex items-center'>
                          <input
                            type='radio'
                            id={`filter-mobile-${cat._id}`}
                            name='category'
                            className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black'
                            onChange={() => handleCategoryChange(cat._id)} // Set the category when clicked
                            checked={cat._id === category} // Controlled input
                          />
                          <label
                            htmlFor={`filter-mobile-${cat._id}`}
                            className='ml-3 min-w-0 flex-1 text-gray-500'
                          >
                            {cat.frName}
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
          <div className='flex items-baseline justify-between pb-6 mt-10'>
            <div className='text-4xl font-bold tracking-tight text-gray-900'></div>

            <div className='flex items-center'>
              <button
                type='button'
                onClick={() => setMobileFiltersOpen(true)}
                className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
              >
                <span className='sr-only'>Filters</span>
                <FunnelIcon aria-hidden='true' className='h-5 w-5' />
              </button>
            </div>
          </div>

          <div aria-labelledby='products-heading' className='pb-24 pt-6'>
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
                        Categories
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
                      {/* Static "All" category */}
                      <div className='flex items-center'>
                        <input
                          type='radio'
                          id='filter-all'
                          name='category'
                          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                          onChange={() => handleCategoryChange('all')} // Handle the "All" selection
                          checked={category === ''} // Checked if category is empty (all)
                        />
                        <label
                          htmlFor='filter-all'
                          className='ml-3 text-sm text-gray-600'
                        >
                          All
                        </label>
                      </div>

                      {/* Dynamic categories */}
                      {categories?.map((cat) => (
                        <div key={cat._id} className='flex items-center'>
                          <input
                            type='radio'
                            id={`filter-${cat._id}`}
                            name='category'
                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                            onChange={() => handleCategoryChange(cat._id)} // Set category ID on change
                            checked={cat._id === category} // Controlled input
                          />
                          <label
                            htmlFor={`filter-${cat._id}`}
                            className='ml-3 text-sm text-gray-600'
                          >
                            {cat.frName}
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
