import { useTranslation } from 'react-i18next'
import Button from '../Button'
import { hero } from '../../assets'

const SpecialOffer = () => {
  const { t } = useTranslation()

  return (
    <div className='flex justify-between items-center max-xl:flex-col-reverse gap-10 max-container'>
      <div className='flex-1'>
        <img
          draggable='false'
          src={hero}
          alt={t('specialOffer.altText')}
          width={773}
          height={687}
          className='object-contain rounded-[60px] w-full'
        />
      </div>
      <div className='flex flex-1 flex-col'>
        <h2 className='text-4xl font-palanquin font-bold'>
          <span className='text-[#0a62a5]'>{t('specialOffer.title1')} </span>
          {t('specialOffer.title2')}
        </h2>
        <p className='mt-6 text-[#6D6D6D] text-lg leading-7 font-palanquin'>
          {t('specialOffer.description1')} {t('specialOffer.description2')}
        </p>
        {/* <p className='text-[#6D6D6D] text-lg leading-7 font-palanquin'></p> */}
        <div className='mt-11 flex flex-wrap gap-4'>
          <Button label={t('specialOffer.button')} iconURL='' />
        </div>
      </div>
    </div>
  )
}

export default SpecialOffer
