'use client'
import { useStateContext } from '@/context/context'

export default function Home() {
  const { state, setState } = useStateContext()

  return (
    <>
      <h1>Home page!</h1>
      <p>current name: {state.name}</p>
      <p>current number: {state.number}</p>
      <button
        onClick={() =>
          setState((prev: any) => ({ ...prev, number: prev.number + 1 }))
        }
      >
        +1
      </button>
      <p>{process.env.NEXT_PUBLIC_API_URL}</p>
    </>
  )
}
