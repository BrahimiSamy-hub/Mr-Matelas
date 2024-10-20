import Footer from '../component/Footer'
import { useTranslation } from 'react-i18next'
import Services from '../component/Home/Services'

const About = () => {
  const { t } = useTranslation()

  return (
    <>
      <section className='min-h-screen xl:sm:pl-16 pl-8 wide:sm:pr-16 pr-8 sm:pb-24 pb-12'>
        <div className='mt-16 flex flex-col gap-8'>
          <div className='flex flex-col justify-center items-center'>
            <h2 className='text-4xl font-palanquin font-bold'>
              {t('about.title')}
            </h2>
            <div className='w-[220px] h-1 bg-[#0a62a5] mt-2 mb-4'></div>
            <p className='leading-8 mt-4 max-w-5xl font-montserrat text-center text-lg text-[#464545]'>
              {t('about.description')}
            </p>
          </div>
          <div className='flex justify-center'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4031.532549886813!2d6.14591140170311!3d35.54891267056871!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f413a6bc410a3b%3A0xe4d75f4e2733f406!2zQ29tZm9ydCBzcGFjZSAtINmB2LbYp9ihINin2YTYsdin2K3YqQ!5e0!3m2!1sfr!2sdz!4v1727343894468!5m2!1sfr!2sdz'
              title={t('about.mapTitle')}
              className=' h-[500px] md:h-[540px] rounded-md w-full'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </section>

      <div className='sm:px-16 px-8 py-10'>
        <Services />
      </div>

      <Footer />
    </>
  )
}

export default About
