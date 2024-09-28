import Hero from '../component/Home/Hero'
import Featured from '../component/Home/FeaturedProducts'
import Footer from '../component/Footer'
import Categories from '../component/Home/Categories'
const Home = () => {
  return (
    <div className='h-screen'>
      <Hero />
      <Categories />
      {/* <Featured /> */}
      <Footer />
    </div>
  )
}

export default Home
