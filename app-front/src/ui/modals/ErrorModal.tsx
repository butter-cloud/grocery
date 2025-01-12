import ModalButtonContainer from '@/ui/modals/ModalButtonContainer'
import { ModalText } from '@/ui/modals/Modal'

export default function ErrorModal() {
  return (
    <>
      <ModalText>
        Oops! <br /> Something went wrong.
        <br />
        Please try again.
      </ModalText>
      <ModalButtonContainer primaryButtonText={'close'} />
    </>
  )
}
