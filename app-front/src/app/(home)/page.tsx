'use client'
import styled from 'styled-components'

const MainImage = styled.img`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: -1;
`
export default function Home() {
  return (
    <>
      <MainImage src={'/image/peach.jpg'} />
    </>
  )
}
