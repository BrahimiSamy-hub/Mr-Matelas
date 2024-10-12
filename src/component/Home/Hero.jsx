import { useTranslation } from 'react-i18next'
import hero from '../../assets/hero.png'
import Button from '../Button'

const Hero = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar' // Check if the language is Arabic (RTL)

  return (
    <div
      id='home'
      className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container'
    >
      <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full pt-28'>
        <p className='text-xl font-montserrat text-[#0a62a5]'>
          {t('hero.products')}
        </p>

        <h1 className='mt-10 text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold'>
          <span
            className={`xl:bg-white xl:whitespace-nowrap rounded-full relative z-10 ${
              isRTL ? 'pl-6' : 'pr-6'
            }`}
          >
            {t('hero.newArrival')}
          </span>
          <br />
          <span className='text-7xl '>{t('hero.of')} </span>
          <span
            className={`text-[#0a62a5] inline-block mt-5 xl:bg-white xl:whitespace-nowrap relative z-10 rounded-full ${
              isRTL ? 'pl-6' : 'pr-6'
            }`}
          >
            {t('hero.mattresses')}
          </span>
        </h1>
        <p className='font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm'></p>

        <Button label={t('hero.button')} />
      </div>

      <div
        className='relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-cover h-screen bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${hero})` }}
      ></div>
    </div>
  )
}

export default Hero
