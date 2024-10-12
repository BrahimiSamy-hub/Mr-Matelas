import {
  matelas,
  oreiller,
  matela,
  oreiler,
  sommier,
  sommiler,
  couette,
} from '../assets'
import shield from '../assets/shield-tick.svg'
import support from '../assets/support.svg'
import truck from '../assets/truck-fast.svg'
import { useTranslation } from 'react-i18next'

export const products = [
  {
    imgURL: '',
    name: 'Nike Air Jordan-01',
    price: '$200.20',
  },
  {
    imgURL: '',
    name: 'Nike Air Jordan-10',
    price: '$210.20',
  },
  {
    imgURL: '',
    name: 'Nike Air Jordan-100',
    price: '$220.20',
  },
  {
    imgURL: '',
    name: 'Nike Air Jordan-001',
    price: '$230.20',
  },
]

export const navigation = [
  {
    id: '0',
    title: 'Home',
    url: '/',
  },
  {
    id: '1',
    title: 'About',
    url: '/about',
  },
  {
    id: '2',
    title: 'Product',
    url: '/shop',
  },
]

export const services = [
  {
    imgURL: truck,
    labelKey: 'services.freeShipping.label',
    subtextKey: 'services.freeShipping.subtext',
  },

  {
    imgURL: shield,
    labelKey: 'services.securePayment.label',
    subtextKey: 'services.securePayment.subtext',
  },
  {
    imgURL: support,
    labelKey: 'services.help.label',
    subtextKey: 'services.help.subtext',
  },
]
