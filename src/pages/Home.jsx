import Hero from '../component/Home/Hero'
import PopularProducts from '../component/Home/PopularProducts'
import SpecialOffer from '../component/Home/SpecialOffer'
import Services from '../component/Home/Services'
import Footer from '../component/Footer'
const Home = () => {
  return (
    <div className='min-h-screen'>
      <div className='xl:sm:pl-16 pl-6 wide:sm:pr-16 pr-6 sm:pb-24 pb-12 '>
        <Hero />
      </div>
      <div className='sm:px-16 px-6 sm:py-24 py-12'>
        <PopularProducts />
      </div>
      <div className='sm:px-16 px-6 sm:py-24 py-12'>
        <SpecialOffer />
      </div>
      <div className='sm:px-16 px-6 py-10'>
        <Services />
      </div>
      <Footer />
    </div>
  )
}

export default Home
