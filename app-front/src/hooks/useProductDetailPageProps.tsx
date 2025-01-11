export default function useProductDetailPageProps(product: TypeProduct) {
  const addItemToCart = () => {
    // Add item to cart
    alert('Added item to cart!')
  }

  return {
    addItemToCart,
  }
}
