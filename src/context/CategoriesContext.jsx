import { createContext, useState, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from '../api/axios'

const CategoriesContext = createContext()

export const useCategories = () => useContext(CategoriesContext)

const fetchCategories = async () => {
  const { data } = await axios.get(`/categories`)
  console.log(data)

  return data
}

export const CategoriesProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('')

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    keepPreviousData: true,
  })

  const categories = data

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        selectedCategory,
        setSelectedCategory,
        isLoading,
        isError,
        error,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}
