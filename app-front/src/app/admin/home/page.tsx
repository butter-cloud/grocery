'use client'
import api from '@/config/axiosInstance'
import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { NextResponse } from 'next/server'

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  color: black;
  border: 1px solid grey;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #bcbbbb;
  }
`

export default function adminHome() {
  const [product, setProduct] = useState({ name: '', price: 0 })
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    api
      .get('/security/admin')
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          console.log(res)
        }
      })
      .catch((error) => {
        console.log(error)
        console.log('error status : ', error.status)
        if (error.status === 403) {
          alert('admin 권한이 없습니다.')
          window.location.replace('/auth/home')
        } else if (error.status === 401) {
          alert('Login Required')
          window.location.replace('/auth/login')
        }
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

  const handleLogout = () => {
    api.get('/security/logout').then((res) => {
      if (res.status === 200) {
        window.location.replace('/auth/login')
      } else {
        console.log('Logout failed')
      }
    })
  }

  useEffect(() => {
    // getAllProducts()
  }, [])

  return (
    <>
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
      <Button onClick={handleLogout}>logout</Button>
    </>
  )
}
