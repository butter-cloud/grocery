import styled from 'styled-components'
import api from '@/api/axiosInstance'
import { useEffect, useState } from 'react'
import MinusIcon from '@/ui/icons/MinusIcon'
import PlusIcon from '@/ui/icons/PlusIcon'
import useProductDetailPageProps from '@/hook/useProductDetailPageProps'
import useCartProps from '@/hook/useCartProps'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px;
  flex-wrap: wrap;
`

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 1.2rem;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const ProductDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ProductName = styled.div`
  font-weight: bold;
  color: #000;
`

const ProductPrice = styled.div`
  color: #000;
`

const Quantity = styled.span`
  color: #000;
  margin-top: 4px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  padding: 5px 8px;
  width: 100px;

  @media (min-width: 600px) {
    margin-top: 0;
  }
`

const RemoveButton = styled.span`
  font-size: 18px;
  cursor: pointer;
  color: #ff5555;
  &:hover {
    color: #ff0000;
  }
`

const QuantityButton = styled.button`
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  background-color: transparent;
  height: 100%;
`

export default function CartRow({ item }) {
  const [data, setData] = useState({} as TypeProduct)
  const [quantity, setQuantity] = useState(item.quantity)
  const [isDeleted, setIsDeleted] = useState(false)
  const { increaseCartQuantity, decreaseCartQuantity, deleteItem } =
    useCartProps()

  const getProductDetail = () => {
    api
      .get(`/product/${item.productId}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    console.log('cart row for item ', item)
    getProductDetail()
  }, [])

  const handlePlusButton = () => {
    increaseCartQuantity(item.productId)
    setQuantity(quantity + 1)
  }

  const handleMinusButton = () => {
    if (quantity === 1) {
      return
    }
    decreaseCartQuantity(item.productId)
    setQuantity(quantity - 1)
  }

  const handleDeleteButton = () => {
    deleteItem(item.productId)
    setIsDeleted(true)
  }

  return (
    !isDeleted && (
      <Wrapper>
        <ProductImage src={'/image/apple.png'} />
        <ProductInfo>
          <ProductDetail>
            <ProductName>{data.name}</ProductName>
            <ProductPrice>{data.price}원</ProductPrice>
          </ProductDetail>
          <Quantity>
            <QuantityButton onClick={handleMinusButton}>
              <MinusIcon />
            </QuantityButton>
            {quantity}
            <QuantityButton onClick={handlePlusButton}>
              <PlusIcon />
            </QuantityButton>
          </Quantity>
        </ProductInfo>
        <RemoveButton onClick={handleDeleteButton}>✕</RemoveButton>
      </Wrapper>
    )
  )
}
