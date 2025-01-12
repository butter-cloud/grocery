import { ModalType } from '@/type/ModalType'

export type ModalState = {
  isOpen: boolean
  modalType: ModalType | null
  content: {
    title?: string
    body?: string
    primaryButton?: string
    secondaryButton?: string
  }
}
