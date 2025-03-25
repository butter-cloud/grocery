'use client'
import styled from 'styled-components'
import api from '@/api/axiosInstance'

const MainImage = styled.img`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: -1;
  opacity: 0.4; // (0: 완전 투명, 1: 불투명)
  filter: brightness(100%);
`

const Main = styled.div`
  position: absolute;
  top: 38%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`

const Text = styled.span`
  color: #373737;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  font-style: italic;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`

const Input = styled.input`
  color: #737373;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  font-style: italic;

  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  font-size: 3rem;
  border: none;
  background: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.95);
  }
`

export default function Home() {
  return (
    <>
      <MainImage src={'/image/carrot.jpg'} />
      <Main>
        <Text>So, what are you looking for today?</Text>
        <InputContainer>
          <Input placeholder={''} autoFocus={true} />
          <Button>🍐</Button>
        </InputContainer>
      </Main>
    </>
  )
}
