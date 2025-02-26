'use client'
import api from '@/config/axiosInstance'
import { ChangeEvent, useEffect, useState } from 'react'

export default function New() {
  const [data, setData] = useState<string | null>(null)
  const [product, setProduct] = useState({ name: '', price: 0 })
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    api
      .get('/security/admin')
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          alert('admin 권한이 없습니다.')
          window.location.replace('/auth/security/home')
        }
        if (error.status === 401) {
          alert('Login Required')
          window.location.replace('/auth/security/login')
        }
        console.log(error)
      })
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const addNewProduct = () => {
    api
      .post('/product/new', product)
      .then((res) => {
        console.log(res)
        getAllProducts()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getAllProducts = () => {
    api
      .get('/product/all')
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      <h3>{data ?? ''}</h3>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleInputChange}
        placeholder="Product Name"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleInputChange}
        placeholder="Product Price"
      />
      <button onClick={addNewProduct}>Add item</button>
      <br />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </>
  )
}
