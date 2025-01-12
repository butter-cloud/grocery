import ModalButtonContainer from '@/ui/modals/ModalButtonContainer'
import { ModalText } from '@/ui/modals/Modal'

export default function CartErrorModal() {
  return (
    <>
      <ModalText>
        <span>
          Oops! <br /> Something went wrong.
          <br />
          Please try again.
        </span>
      </ModalText>
      <ModalButtonContainer primaryButtonText={'close'} />
    </>
  )
}
