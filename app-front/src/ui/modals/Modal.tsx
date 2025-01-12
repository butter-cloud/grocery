import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '@/util/redux/store'
import { closeModal } from '@/util/redux/modalSlice'
import CartSuccessModal from '@/ui/modals/CartSuccessModal'
import CartErrorModal from '@/ui/modals/CartErrorModal'
import ErrorModal from '@/ui/modals/ErrorModal'

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

const ModalContent = styled.div`
  width: 300px;
  text-align: center;
  z-index: 1000;
  padding: 40px 10px 10px 10px;
  height: 200px;
  background-image: url('/image/modalblank.png');
  background-size: cover; /* 또는 contain */
  background-position: center;
  background-repeat: no-repeat;
`

export const ModalText = styled.div`
  padding: 20px;
  height: 100px;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-family: serif;
  font-style: italic;
`

const Modal = () => {
  const dispatch = useDispatch()
  const { isOpen, modalType, content } = useSelector(
    (state: RootState) => state.modal,
  )

  if (!isOpen) return null

  const renderContent = () => {
    switch (modalType) {
      case 'cartSuccess':
        return <CartSuccessModal />
      case 'cartError':
        return <CartErrorModal />
      case 'error':
        return <ErrorModal />
      default:
        return null
    }
  }

  return (
    <ModalBackdrop onClick={() => dispatch(closeModal())}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {renderContent()}
      </ModalContent>
    </ModalBackdrop>
  )
}

export default Modal
