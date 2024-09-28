import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from '../api/axios'

const SingleProductContext = createContext()

export const useSingleProduct = () => useContext(SingleProductContext)

const fetchProductById = async (id) => {
  const { data } = await axios.get(`/products/${id}`)
  return data
}

export const SingleProductProvider = ({ children, productId }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
  })

  const product = data || {}

  return (
    <SingleProductContext.Provider
      value={{
        product,
        isLoading,
        isError,
        error,
      }}
    >
      {children}
    </SingleProductContext.Provider>
  )
}
