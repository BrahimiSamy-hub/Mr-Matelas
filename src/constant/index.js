import {
  matelas,
  oreiller,
  matela,
  oreiler,
  sommier,
  sommiler,
  couette,
} from '../assets'

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
    url: '/product',
  },
]

export const products = [
  {
    id: 1,
    name: 'product_refrigeratorLG',
    href: '/singleproduct',
    category: 'category_refrigerators',
    imageSrc: matelas,
    imageAlt: 'alt_refrigeratorLG',
    price: '120000',
    color: 'Silver',
  },
  {
    id: 2,
    name: 'product_ovenBosch',
    href: '/singleproduct',
    category: 'category_ovens',
    imageSrc: matela,
    imageAlt: 'alt_ovenBosch',
    price: '60000',
    color: 'Black',
  },
  {
    id: 3,
    name: 'product_washerSamsung',
    href: '/singleproduct',
    category: 'category_washers',
    imageSrc: oreiller,
    imageAlt: 'alt_washerSamsung',
    price: '80000',
    color: 'White',
  },
  {
    id: 4,
    name: 'product_microwavePanasonic',
    href: '/singleproduct',
    category: 'category_microwaves',
    imageSrc: oreiler,
    imageAlt: 'alt_microwavePanasonic',
    price: '15000',
    color: 'Black',
  },
  {
    id: 5,
    name: 'product_airConditionerDaikin',
    href: '/singleproduct',
    category: 'category_sommier',
    imageSrc: sommier,
    imageAlt: 'alt_airConditionerDaikin',
    price: '100000',
    color: 'White',
  },
  {
    id: 6,
    name: 'product_refrigeratorSamsung',
    href: '/singleproduct',
    category: 'category_sommier',
    imageSrc: sommiler,
    imageAlt: 'alt_refrigeratorSamsung',
    price: '110000',
    color: 'Silver',
  },
  {
    id: 7,
    name: 'product_washerLG',
    href: '/singleproduct',
    category: 'category_linge',
    imageSrc: couette,
    imageAlt: 'alt_washerLG',
    price: '85000',
    color: 'White',
  },
]