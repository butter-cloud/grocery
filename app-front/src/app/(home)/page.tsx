'use client'
import { useStateContext } from '@/context/context'
import styled from 'styled-components'

const MainImage = styled.img`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: -1;
`
export default function Home() {
  const { state, setState } = useStateContext()

  return (
    <>
      <MainImage src={'/peach.jpg'} />
      {/*<p>current name: {state.name}</p>*/}
      {/*<p>current number: {state.number}</p>*/}
      {/*<button*/}
      {/*  onClick={() =>*/}
      {/*    setState((prev: any) => ({ ...prev, number: prev.number + 1 }))*/}
      {/*  }*/}
      {/*>*/}
      {/*  +1*/}
      {/*</button>*/}
      {/*<p>API: {process.env.NEXT_PUBLIC_API_URL}</p>*/}
    </>
  )
}
