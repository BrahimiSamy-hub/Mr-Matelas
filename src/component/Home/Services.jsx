import { services } from '../../constant'
import ServiceCard from './ServiceCard'

const Services = () => {
  return (
    <div className=' flex justify-center flex-wrap gap-9'>
      {services.map((service) => (
        <ServiceCard key={service.label} {...service} />
      ))}
    </div>
  )
}

export default Services
