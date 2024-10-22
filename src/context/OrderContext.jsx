// import { createContext, useContext } from 'react'
// import { useMutation } from '@tanstack/react-query'
// import axios from '../api/axios'

// // Create the Order context
// const OrderContext = createContext()

// export const useOrder = () => useContext(OrderContext)

// // Function to create an order
// const createOrder = async (orderData) => {
//   const { data } = await axios.post('/orders', orderData)
//   return data
// }

// export const OrderProvider = ({ children }) => {
//   // Using `useMutation` to handle order creation
//   const {
//     mutate: createOrderMutation,
//     isLoading,
//     isError,
//     error,
//     isSuccess,
//   } = useMutation({
//     mutationFn: createOrder,
//   })

//   return (
//     <OrderContext.Provider
//       value={{
//         createOrderMutation,
//         isLoading,
//         isError,
//         error,
//         isSuccess,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   )
// }

import { createContext, useContext, useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from '../api/axios'

// Create the Order context
const OrderContext = createContext()

export const useOrder = () => useContext(OrderContext)

// Function to create an order

export const OrderProvider = ({ children }) => {
  const [wilayas, setWilayas] = useState([])
  const [loading, setLoading] = useState(true)

  const createOrder = async (orderData) => {
    try {
      console.log('Creating order with data:', orderData) // Log the order data being sent
      const { data } = await axios.post('/orders', orderData)
      console.log('Order created successfully:', data) // Log successful response
      return data
    } catch (error) {
      console.error('Error creating order:', error) // Log error details
      throw error // Re-throw the error so it can be handled by the mutation
    }
  }

  const fetchWilayas = async () => {
    const response = await axios.get('/wilayas')
    setWilayas(response.data) // Update state with the fetched data
  }

  useEffect(() => {
    fetchWilayas() // Call fetch function when the component mounts
  }, [])

  const {
    mutate: createOrderMutation,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: createOrder,
  })

  return (
    <OrderContext.Provider
      value={{
        createOrderMutation,
        isLoading,
        isError,
        error,
        isSuccess,
        wilayas,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
