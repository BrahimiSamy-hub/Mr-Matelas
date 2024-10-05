import Footer from '../component/Footer'
import { useTranslation } from 'react-i18next'
import Services from '../component/Home/Services'
const About = () => {
  const { t } = useTranslation()

  return (
    <>
      <section className='py-10'>
        <div className='mt-16 gap-20 flex flex-col h-[540px] md:flex-row'>
          <div className='flex flex-col'>
            <h2 className='text-4xl font-palanquin font-bold'>
              <span className='text-blue-300'> Mr </span> Matelas
            </h2>
            <div className='w-[260px] h-1 bg-blue-300 mt-2 mb-4'></div>
            <p className='leading-8 mt-4 w-[800px] font-montserrat text-lg text-[#464545]'>
              {t('about.description')}
            </p>
          </div>

          <iframe
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4031.532549886813!2d6.14591140170311!3d35.54891267056871!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f413a6bc410a3b%3A0xe4d75f4e2733f406!2zQ29tZm9ydCBzcGFjZSAtINmB2LbYp9ihINin2YTYsdin2K3YqQ!5e0!3m2!1sfr!2sdz!4v1727343894468!5m2!1sfr!2sdz'
            title={t('about.mapTitle')}
            className='w-full h-[1500px] md:h-full rounded-md'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
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
