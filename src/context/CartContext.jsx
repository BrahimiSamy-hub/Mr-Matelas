import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const toggleCart = () => {
    setOpen(!isOpen)
  }

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      )
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity + (newItem.quantity || 1),
        }
        return updatedItems
      }

      return [...prevItems, { ...newItem, quantity: newItem.quantity || 1 }]
    })
  }

  const removeFromCart = (id, size, color) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      )
    )
  }

  return (
    <CartContext.Provider
      value={{ isOpen, toggleCart, cartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
