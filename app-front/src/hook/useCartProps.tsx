const useCartProps = () => {
  const increaseCartQuantity = (id) => {
    const localCart = localStorage.getItem('cart')
    let cart: TypeProduct[] = []

    if (localCart) {
      cart = JSON.parse(localCart)
    }
    const itemIndex = cart.findIndex((item) => item.id === id)
    if (itemIndex !== -1) {
      cart[itemIndex].quantity += 1
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const decreaseCartQuantity = (id) => {
    const localCart = localStorage.getItem('cart')
    let cart: TypeProduct[] = []

    if (localCart) {
      cart = JSON.parse(localCart)
    }
    const itemIndex = cart.findIndex((item) => item.id === id)
    if (itemIndex !== -1) {
      cart[itemIndex].quantity -= 1
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const deleteItem = (id) => {
    const localCart = localStorage.getItem('cart')
    let cart: TypeProduct[] = []

    if (localCart) {
      cart = JSON.parse(localCart)
    }
    const itemIndex = cart.findIndex((item) => item.id === id)
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    if (cart.length === 0) {
      window.location.reload()
    }
  }

  return {
    increaseCartQuantity,
    decreaseCartQuantity,
    deleteItem,
  }
}

export default useCartProps
