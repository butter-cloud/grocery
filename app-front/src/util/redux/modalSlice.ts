import { createSlice } from '@reduxjs/toolkit'

interface ModalState {
  isOpen: boolean
}

const initialState: ModalState = {
  isOpen: false,
}
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state) {
      console.log('dispatch open modal')
      state.isOpen = true
    },
    closeModal(state) {
      state.isOpen = false
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
