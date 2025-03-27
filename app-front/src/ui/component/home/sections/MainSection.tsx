'use client'

import styled from 'styled-components'
import { useEffect, useState } from 'react'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  //background-image: url('/image/carrot.jpg'); /* 배경 이미지 URL */
  background-size: cover; /* 배경 이미지가 전체 화면을 덮도록 설정 */
  background-position: center; /* 배경 이미지의 위치 조정 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  height: 100vh; /* 화면 전체 높이 */
`

const Text = styled.span`
  color: #554c3e;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  font-style: italic;
  font-family: serif;
  //color: #fff;
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

export const MainSection = () => {
  const [placeholder, setPlaceholder] = useState('')
  const placeHolderList = ['peach', 'coffee', 'bean', 'bread', 'brioche']
  const getRandomPlaceHolder = () => {
    const randomIndex = Math.floor(Math.random() * placeHolderList.length)
    return placeHolderList[randomIndex]
  }

  useEffect(() => {
    setPlaceholder(getRandomPlaceHolder())
  }, [])

  return (
    <>
      <Wrapper>
        <Text>So, what are you looking for today?</Text>
        <InputContainer>
          <Input placeholder={placeholder} autoFocus={true} />
          <Button>🍐</Button>
        </InputContainer>
      </Wrapper>
    </>
  )
}

export default MainSection
