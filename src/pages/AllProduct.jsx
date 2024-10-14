import { useLocation } from 'react-router-dom'
import Filter from '../component/Products/Filter'
import Footer from '../component/Footer'
import Pagination from '../component/Products/Pagination'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useProducts } from '../context/ProductContext'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Product = () => {
  const { products, totalDocs, isLoading, isError, error } = useProducts()
  const { t, i18n } = useTranslation()
  const query = useQuery()
  const selectedCategories = query.get('categories')?.split(',') || []

  const filteredProducts = selectedCategories.length
    ? products.filter((product) =>
        selectedCategories.includes(product.category?._id)
      )
    : products

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  // Map language codes to product property prefixes
  const languagePrefixes = {
    en: 'eng',
    fr: 'fr',
    ar: 'ar',
  }

  const currentLanguage = i18n.language
  const languagePrefix = languagePrefixes[currentLanguage] || 'eng'

  return (
    <>
      <section className='xl:sm:pl-16 pl-8 wide:sm:pr-16 pr-8 sm:pb-24 pb-12'>
        <Filter />
      </section>
      <Footer />
    </>
  )
}

export default Product
