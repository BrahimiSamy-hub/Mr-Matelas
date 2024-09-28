import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import lits from '../../assets/lits.webp'
import matelas from '../../assets/matelasC.webp'
import oreillers from '../../assets/oreillers.webp'
import linge from '../../assets/Linge.webp'

const Categories = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleCategoryClick = (category) => {
    navigate(`/product?categories=${encodeURIComponent(category)}`)
  }

  const categoryImages = {
    'SOMMIERS/LITS': lits,
    OREILLERS: oreillers,
    MATELAS: matelas,
    'LINGE DE LIT': linge,
  }

  const categories = ['SOMMIERS/LITS', 'OREILLERS', 'MATELAS', 'LINGE DE LIT']

  return (
    <div className='m-10 pb-10 '>
      <h2 className='text-2xl font-bold mb-10'>{t('shop_by_categories')}</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
        {categories.map((category) => (
          <div
            key={category}
            className='hover:cursor-pointer hover:scale-95 transition-transform duration-300'
            onClick={() => handleCategoryClick(category)}
          >
            <img
              src={categoryImages[category]}
              alt={category}
              className='w-full h-full object-contain rounded-md'
            />
            <div className='text-center mt-4 hover:cursor-pointer'>
              <span className='block text-lg font-medium'>{t(category)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
