import { createContext, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from '../api/axios'

// Create the Order context
const OrderContext = createContext()

export const useOrder = () => useContext(OrderContext)

// Function to create an order
const createOrder = async (orderData) => {
  const { data } = await axios.post('/order', orderData)
  return data
}

export const OrderProvider = ({ children }) => {
  // Using `useMutation` to handle order creation
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
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
