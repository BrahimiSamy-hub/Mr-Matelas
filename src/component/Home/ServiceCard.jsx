import { useTranslation } from 'react-i18next'

const ServiceCard = ({ imgURL, labelKey, subtextKey }) => {
  const { t } = useTranslation() // Hook to access the translation function

  return (
    <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-xl px-10 py-16 hover:scale-95 duration-700 transition-transform'>
      <div className='w-11 h-11 flex justify-center items-center bg-[#0a62a5] rounded-full'>
        <img
          src={imgURL}
          alt={t(labelKey)} // Use translation for alt text as well
          width={24}
          height={24}
          draggable='false'
        />
      </div>
      <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold'>
        {t(labelKey)} {/* Translate the label */}
      </h3>
      <p className='mt-3 break-words font-montserrat text-xl leading-normal text-[#6D6D6D]'>
        {t(subtextKey)} {/* Translate the subtext */}
      </p>
    </div>
  )
}

export default ServiceCard
