import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalState } from '@/type/ModalState'
import { ModalType } from '@/type/ModalType'

const initialState: ModalState = {
  isOpen: false,
  modalType: ModalType.NONE,
  content: {},
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{
        modalType: ModalState['modalType']
        content: ModalState['content']
      }>,
    ) {
      console.log('dispatch open modal')
      state.isOpen = true
      state.modalType = action.payload.modalType
      state.content = action.payload.content
    },
    closeModal(state) {
      state.isOpen = false
      state.modalType = null
      state.content = {}
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
