import ServiceCard from './ServiceCard' // Adjust path as necessary
import { services } from '../../constant/index'
const Services = () => {
  return (
    <div className='flex justify-center flex-wrap gap-9'>
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          imgURL={service.imgURL}
          labelKey={service.labelKey}
          subtextKey={service.subtextKey}
        />
      ))}
    </div>
  )
}

export default Services
