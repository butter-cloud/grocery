import ModalButtonContainer from '@/ui/modals/ModalButtonContainer'
import { closeModal } from '@/redux/modalSlice'
import { ModalText } from '@/ui/modals/Modal'
import { useDispatch } from 'react-redux'

export default function CartSuccessModal() {
  const dispatch = useDispatch()

  return (
    <>
      <ModalText>
        <span>Successfully Added! 🛒</span>
      </ModalText>
      <ModalButtonContainer
        isTwoButton={true}
        primaryButtonText={'View Cart'}
        secondaryButtonText={'Keep browsing'}
        primaryOnClick={() => {
          window.location.href = '/'
        }}
        secondaryOnClick={() => {
          dispatch(closeModal())
        }}
      />
    </>
  )
}
