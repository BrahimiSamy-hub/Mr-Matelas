import React from 'react'

const features = [
  {
    icon: '📦', // You can replace these with appropriate SVGs or FontAwesome icons
    title: 'Free Shipping',
    description: 'Free shipping for orders above 5000DA',
  },
  {
    icon: '💲',
    title: 'Money Guarantee',
    description: 'Within 30 days for an exchange',
  },
  {
    icon: '🎧',
    title: 'Online Support',
    description: '24 hours a day, 7 days a week',
  },
  {
    icon: '💳',
    title: 'Flexible Payment',
    description: 'Pay with multiple credit cards',
  },
]

const Features = () => {
  return (
    <div className='py-8 px-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='text-center border border-gray-200 shadow-lg p-4 rounded-lg'
          >
            <div className='text-4xl mb-2'>{feature.icon}</div>
            <h3 className='font-bold text-lg'>{feature.title}</h3>
            <p className='text-gray-500'>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
