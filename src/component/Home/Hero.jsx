import bg from '../../assets/hero.webp'
const Hero = () => {
  return (
    <div>
      <img
        src={bg}
        alt=''
        className='h-screen w-screen object-fill'
        loading='lazy'
      />
    </div>
  )
}

export default Hero
