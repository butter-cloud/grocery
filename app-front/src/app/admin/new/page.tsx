'use client'
import api from '@/config/axiosInstance'

export default function New() {
  const product = {
    name: 'Apple',
    price: 1000,
  }

  const addNewItem = () => {
    api
      .post('/products', product)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <button onClick={addNewItem}>Add default item</button>
    </>
  )
}
