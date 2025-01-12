import styled from 'styled-components'
import { closeModal } from '@/redux/modalSlice'
import { useDispatch } from 'react-redux'

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 10px;
`

const PrimaryButton = styled.div`
  // background-color: white;
  // color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  cursor: pointer;
`

const SecondaryButton = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  cursor: pointer;
`

interface ModalButtonContainerProps {
  isTwoButton?: boolean
  primaryButtonText: string
  secondaryButtonText?: string
  primaryOnClick?: () => void
  secondaryOnClick?: () => void
}

export default function ModalButtonContainer(props: ModalButtonContainerProps) {
  const dispatch = useDispatch()
  const handleError = () => {
    dispatch(closeModal())
    window.location.reload()
  }
  const {
    isTwoButton = false,
    primaryButtonText,
    secondaryButtonText,
    primaryOnClick = handleError,
    secondaryOnClick = handleError,
  } = props
  return (
    <>
      <ButtonWrapper>
        <>
          <PrimaryButton onClick={primaryOnClick}>
            {primaryButtonText}
          </PrimaryButton>
          {isTwoButton ? (
            <SecondaryButton onClick={secondaryOnClick}>
              {secondaryButtonText}
            </SecondaryButton>
          ) : (
            <></>
          )}
        </>
      </ButtonWrapper>
    </>
  )
}
