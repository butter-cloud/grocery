import React, { createContext, useContext, useState, ReactNode } from 'react'

interface TypeGroceryState {
  name: string
  number: number
}

interface StateContextType {
  state: TypeGroceryState
  setState: React.Dispatch<React.SetStateAction<TypeGroceryState>>
}

const StateContext = createContext<StateContextType | undefined>(undefined)

export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider')
  }
  return context
}

interface StateProviderProps {
  children: ReactNode
}

const initialState: TypeGroceryState = {
  name: 'new name',
  number: 0,
}

export const StateProvider = ({ children }: StateProviderProps) => {
  const [state, setState] = useState<TypeGroceryState>(initialState)

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  )
}
