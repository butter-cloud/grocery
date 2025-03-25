import { useState } from 'react'

export const useProductDetailPageProps = () => {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return {
    quantity,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
  }
}

export default useProductDetailPageProps
