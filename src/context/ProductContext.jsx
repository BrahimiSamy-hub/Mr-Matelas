// import { createContext, useState, useContext } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import axios from '../api/axios'

// const ProductContext = createContext()

// export const useProducts = () => useContext(ProductContext)

// const fetchProducts = async ({ queryKey }) => {
//   const [_, page, limit, category] = queryKey
//   const params = { page, limit }
//   if (category) {
//     params.category = category
//   }
//   const { data } = await axios.get(`/products`, { params })
//   return data
// }

// export const ProductProvider = ({ children }) => {
//   const [page, setPage] = useState(1)
//   const [limit, setLimit] = useState(12)
//   const [category, setCategory] = useState('')

//   const { data, error, isLoading, isError } = useQuery({
//     queryKey: ['products', page, limit, category],
//     queryFn: fetchProducts,
//     keepPreviousData: true,
//   })

//   const products = data?.docs || []
//   const totalDocs = data?.totalDocs || 0
//   const totalPages = data?.totalPages || 1
//   const currentPage = data?.page || 1
//   const hasPrevPage = data?.hasPrevPage || false
//   const hasNextPage = data?.hasNextPage || false
//   const limitPerPage = data?.limit || limit

//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         totalDocs,
//         totalPages,
//         currentPage,
//         hasPrevPage,
//         hasNextPage,
//         limitPerPage,
//         page,
//         limit,
//         category,
//         setPage,
//         setLimit,
//         setCategory,
//         isLoading,
//         isError,
//         error,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   )
// }

import { createContext, useState, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from '../api/axios'

const ProductContext = createContext()

export const useProducts = () => useContext(ProductContext)

const fetchProducts = async ({ queryKey }) => {
  const [_, page, limit, category] = queryKey
  const params = { page, limit }
  if (category) {
    params.category = category
  }
  const { data } = await axios.get(`/products`, { params })
  return data
}

export const ProductProvider = ({ children }) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [category, setCategory] = useState('') // The selected category

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['products', page, limit, category],
    queryFn: fetchProducts,
    keepPreviousData: true,
  })

  const products = data?.docs || []
  const totalDocs = data?.totalDocs || 0
  const totalPages = data?.totalPages || 1
  const currentPage = data?.page || 1
  const hasPrevPage = data?.hasPrevPage || false
  const hasNextPage = data?.hasNextPage || false
  const limitPerPage = data?.limit || limit

  return (
    <ProductContext.Provider
      value={{
        products,
        totalDocs,
        totalPages,
        currentPage,
        hasPrevPage,
        hasNextPage,
        limitPerPage,
        page,
        limit,
        category, // Provide category to access it in the filter component
        setPage,
        setLimit,
        setCategory, // Function to update the category
        isLoading,
        isError,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
