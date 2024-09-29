import { useState, useEffect } from 'react'
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion'
import { chevron } from '../../assets'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCategories } from '../../context/CategoriesContext'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <img
          className={`ml-auto transition-transform duration-200 ease-out ${
            isEnter ? 'rotate-180' : ''
          }`}
          src={chevron}
          alt='Chevron'
          loading='lazy'
        />
      </>
    )}
    className='border-b'
    buttonProps={{
      className: () => 'flex w-full p-4 text-left',
    }}
    contentProps={{
      className: 'transition-height duration-200 ease-out',
    }}
    panelProps={{ className: 'p-4' }}
  />
)

export default function App() {
  const { t, i18n } = useTranslation()
  const query = useQuery()
  const navigate = useNavigate()

  const { categories: fetchedCategories } = useCategories()

  // Map language codes to category name prefixes
  const languagePrefixes = {
    en: 'eng',
    fr: 'fr',
    ar: 'ar',
  }

  const currentLanguage = i18n.language
  const languagePrefix = languagePrefixes[currentLanguage] || 'eng'

  const selectedCategories = query.get('categories')?.split(',') || []
  const categoriesFromQuery = selectedCategories.reduce(
    (acc, category) => {
      acc[category] = true
      return acc
    },
    fetchedCategories.reduce((acc, category) => {
      acc[category[`${languagePrefix}Name`]] = false // Dynamically use the language prefix
      return acc
    }, {})
  )

  const [categories, setCategories] = useState(categoriesFromQuery)

  // Update categories state when fetchedCategories change
  useEffect(() => {
    const updatedCategories = fetchedCategories.reduce((acc, category) => {
      acc[category[`${languagePrefix}Name`]] =
        categories[category[`${languagePrefix}Name`]] || false
      return acc
    }, {})
    setCategories(updatedCategories)
  }, [fetchedCategories, languagePrefix])

  const handleChangeCategory = (category) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [category]: !prevCategories[category],
    }))
  }

  return (
    <div
      className='sticky top-20 mx-2 my-4 border-t w-44 mt-16 sm:w-64'
      data-aos='fade-up'
    >
      <Accordion transition transitionTimeout={200} allowMultiple>
        <AccordionItem
          header={<h2 className='font-bold'>{t('categories')}</h2>}
          initialEntered
        >
          <ul>
            {fetchedCategories.map((category) => {
              const categoryName =
                category[`${languagePrefix}Name`] || category.engName
              return (
                <li key={category._id} className='flex items-center'>
                  <label className='flex items-center space-x-2'>
                    <input
                      type='checkbox'
                      checked={categories[categoryName]} // Using dynamic language category name
                      onChange={() => handleChangeCategory(categoryName)}
                      className={`custom-checkbox ${
                        currentLanguage === 'ar' ? 'ml-1' : 'mr-1'
                      }`} // Conditionally apply ml-1 for Arabic, mr-1 otherwise
                    />
                    <span className='text-gray-700'>{categoryName}</span>{' '}
                  </label>
                </li>
              )
            })}
          </ul>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
