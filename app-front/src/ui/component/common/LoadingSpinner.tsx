import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const LoadingSpinner = () => {
  return (
    <Wrapper>
      <CircularProgress color="inherit" />
    </Wrapper>
  )
}
