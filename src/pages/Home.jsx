import Hero from '../component/Home/Hero'
import PopularProducts from '../component/Home/PopularProducts'
import SpecialOffer from '../component/Home/SpecialOffer'
import Services from '../component/Home/Services'
const Home = () => {
  return (
    <div className='min-h-screen'>
      <div className='xl:sm:pl-16 pl-8 wide:sm:pr-16 pr-8 sm:pb-24 pb-12 '>
        <Hero />
      </div>
      <div className='sm:px-16 px-8 sm:py-24 py-12'>
        <PopularProducts />
      </div>
      <div className='sm:px-16 px-8 sm:py-24 py-12'>
        <SpecialOffer />
      </div>
      <div className='sm:px-16 px-8 py-10'>
        <Services />
      </div>
    </div>
  )
}

export default Home
