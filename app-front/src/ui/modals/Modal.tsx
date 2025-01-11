import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '@/util/redux/store'
import { closeModal } from '@/util/redux/modalSlice'

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
  background-color: white;
  padding: 20px;
  width: 300px;
  text-align: center;
  z-index: 1000;
`

const Modal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state: RootState) => state.modal.isOpen)

  if (!isOpen) return null

  return (
    <ModalBackdrop onClick={() => dispatch(closeModal())}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>모달 내용</h2>
        <p>여기에 모달의 내용을 작성하세요.</p>
        <button onClick={() => dispatch(closeModal())}>닫기</button>
      </ModalContent>
    </ModalBackdrop>
  )
}

export default Modal
