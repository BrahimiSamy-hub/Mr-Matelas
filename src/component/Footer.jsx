import { logoPng } from '../assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer class='bg-white shadow dark:bg-[#315a79]'>
      <div class='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div class='sm:flex sm:items-center sm:justify-between'>
          <Link
            href='https://flowbite.com/'
            clLinkss='mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
          >
            <img src={logoPng} class='h-10' alt='logo' />
          </Link>
          <ul class='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-white'>
            <li>
              <Link to='/' class='hover:underline me-4 md:me-6'>
                FB
              </Link>
            </li>
            <li>
              <Link to='/about' class='hover:underline me-4 md:me-6'>
                Insta
              </Link>
            </li>
            <li>
              <Link to='/shop' class='hover:underline me-4 md:me-6'>
                Tiktok
              </Link>
            </li>
          </ul>
        </div>
        <hr class='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span class='block text-sm text-gray-500 sm:text-center dark:text-white'>
          © 2024{' '}
          <a
            href='https://pixeldz.store/'
            class='hover:underline'
            target='_blank'
          >
            Powered by PIXEL
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
