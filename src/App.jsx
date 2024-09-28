import { useEffect } from 'react'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home'
import About from '../src/pages/About'
import Product from '../src/pages/Product'
import SingleProduct from '../src/pages/SingleProduct'
import Checkout from '../src/pages/Checkout'
import Navbar from '../src/component/Navbar'
import Footer from '../src/component/Footer'
import Cart from '../src/component/Cart'
import { CartProvider } from './context/CartContext'
const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    })
  }, [])
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/product' element={<Product />} />
          <Route path='/singleProduct' element={<SingleProduct />} />
          <Route path='/Checkout' element={<Checkout />} />
        </Routes>
        <Cart />
      </CartProvider>
    </Router>
  )
}

export default App
