import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 100px;
`
export const Wrapper = styled.div`
  width: 30vw;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const Title = styled.div`
  font-size: 30px;
  border-radius: 3px;
  height: 30px;
  padding-top: 6px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primary};
`

export const LoginTitle = styled.span`
  position: relative;
  font-size: 30px;
  // color: ${({ theme }) => theme.colors.primary};
  margin-left: 15px;
  margin-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translate(-80%, -50%) rotate(-10deg);
    width: 110px;
    height: 35px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    //border: 1px solid grey;
    background: transparent;
    border-radius: 50% / 50%;
    z-index: -1;
  }
`

export const RegisterTitle = styled.span`
  position: relative;
  font-size: 30px;
  // color: ${({ theme }) => theme.colors.primary};
  margin-left: 20px;
  margin-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translate(-90%, -50%) rotate(-10deg);
    width: 140px;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    //border: 1px solid grey;
    background: transparent;
    border-radius: 50% / 50%;
    z-index: -1;
  }
`

export const Input = styled.input`
  height: 40px;
  padding-left: 10px;

  &:focus {
    outline: none;
  }
`

export const Link = styled.a`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`
