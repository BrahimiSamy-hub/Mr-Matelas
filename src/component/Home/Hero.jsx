import { useTranslation } from 'react-i18next'
import { hero } from '../../assets'
import Button from '../Button'

const Hero = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar' // Check if the language is Arabic (RTL)

  return (
    <div
      id='home'
      className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10'
    >
      <div className='relative xl:w-2/5 flex flex-col justify-center font-semibold items-start w-full pt-20 max-sm:pt-32'>
        <p className='text-xl font-montserrat text-[#0a62a5]'>
          {t('hero.products')}
        </p>

        <h1 className='mt-10 text-8xl max-sm:text-[50px] max-sm:leading-[75px] font-bold r'>
          <span
            className={` xl:whitespace-nowrap bg-white rounded-full relative z-10 ${
              isRTL ? 'pl-6' : 'pr-6'
            }`}
          >
            {t('hero.newArrival')}
          </span>
          <br />
          <span className='text-8xl max-sm:text-[50px] max-sm:leading-[75px] mt-5'>
            {t('hero.of')}{' '}
          </span>
          <span
            className={`text-[#0a62a5] inline-block bg-white xl:whitespace-nowrap relative z-10 rounded-full mt-5 ${
              isRTL ? 'pl-6' : 'pr-6'
            }`}
          >
            {t('hero.mattresses')}
          </span>
        </h1>
        <p className='font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-10 sm:max-w-sm'></p>

        <Button label={t('hero.button')} />
      </div>

      <div
        className='relative flex-1 rounded-[60px] flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-cover h-screen bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${hero})` }}
      ></div>
    </div>
  )
}

export default Hero
