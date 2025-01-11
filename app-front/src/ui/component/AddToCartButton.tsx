import styled from 'styled-components'

const Button = styled.button`
  position: absolute;
  bottom: 5%;
  right: 5%;
  transform: translate(-50%, 20px); /* 초기에는 아래로 이동 */
  opacity: 0; /* 기본적으로 숨김 */
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  width: 90%;
  height: 40px;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Text = styled.div`
  font-size: 1.1rem;
`

const Icon = styled.div`
  font-size: 1.2rem;
`
export default function AddToCartButton() {
  return (
    <Button>
      <Text>Add to Cart</Text>
      <Icon>+</Icon>
    </Button>
  )
}
