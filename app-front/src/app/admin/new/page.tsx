'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import productApi from '@/api/product/productApi'

const Wrapper = styled.div`
  height: 85vh;
  display: flex;
  gap: 10px;
  padding: 20px;
`

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`

const Img = styled.img`
  margin-top: 30px;
  width: 300px;
`

const Line = styled.div`
  width: 1px;
  border-left: 1px solid #0a0a0a;
  height: 100%;
`

const TextContainer = styled.div`
  height: 100%;
  padding: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 50px;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  font-style: italic;
  margin-top: 30px;
  margin-bottom: 20px;
`

const Input = styled.input`
  width: 60%;
  padding: 10px;
  border: 1px solid #0a0a0a;
  border-radius: 10px;
  font-size: 1rem;
  min-width: 300px;
`

const Button = styled.button`
  width: 60%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  font-size: 1rem;
  min-width: 300px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Text = styled.span`
  font-size: 1rem;
`

export default function New() {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
  } as TypeProduct)
  const [products, setProducts] = useState<any[]>([])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const addNewProduct = () => {
    productApi
      .addNewProduct(product)
      .then((res) => {
        console.log(res)
        getAllProducts()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getAllProducts = () => {
    productApi
      .getAllProducts()
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
    <Wrapper>
      <TextContainer>
        <Title>Add new item!</Title>
        <Input
          type="text"
          name="name"
          autoComplete="off"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
        <Input
          type="text"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          placeholder="Product Price"
        />
        <Button onClick={addNewProduct}>Add item</Button>
      </TextContainer>
      <ImgContainer>
        <Img src={'/image/apple.png'} />
        <Text>click to upload an image!</Text>
      </ImgContainer>
    </Wrapper>
  )
}
