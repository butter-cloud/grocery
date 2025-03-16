import styled from 'styled-components'
import { isLogin } from '@/util/CommonUtil'
import { forwardRef } from 'react'

const Menu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 99;
`

const MenuBar = styled.a`
  text-align: center;
  font-size: 2rem;
  font-style: italic;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  color: black;
  border: 1px solid grey;
  border-radius: 50px;
  cursor: pointer;
  width: 80px;
  position: absolute;
  right: 25px;
  bottom: 25px;

  &:hover {
    background-color: #bcbbbb;
  }
`

const DesktopMenu = () => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.href = '/'
  }
  return (
    <>
      <Menu>
        <MenuBar href={'/product/best'}>BestSeller</MenuBar>
        <MenuBar href={'/product/all'}>All Products</MenuBar>
        {isLogin() && <Button onClick={handleLogout}>Logout</Button>}
      </Menu>
    </>
  )
}

export default DesktopMenu