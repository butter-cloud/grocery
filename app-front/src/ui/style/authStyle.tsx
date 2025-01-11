import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 100px;
`
export const Wrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
export const Title = styled.div`
  font-size: 24px;
  border-radius: 3px;
  height: 30px;
  font-weight: 700;
  font-style: italic;
  padding-top: 6px;
  margin-bottom: 10px;
`
export const Input = styled.input`
  height: 30px;
  padding-left: 10px;

  &:focus {
    outline: none;
  }
`
export const Button = styled.button`
  height: 30px;
`
