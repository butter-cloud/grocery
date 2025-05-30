'use client'

import styled from 'styled-components'
import { isLogin } from '@/util/CommonUtil'
import api from '@/api/axiosInstance'
import { usePathname } from 'next/navigation'
import { forwardRef } from 'react'

const Menu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 99;
`
// $ means transient prop in react, it is used to pass props to styled components without adding them to the DOM
// prevents the error of passing props to a DOM element that doesn't recognize them
const MenuBar = styled.a<{ $isActive: boolean }>`
  text-align: center;
  font-size: 2rem;
  font-style: italic;
  font-weight: 500;
  color: ${({ $isActive, theme }) => ($isActive ? 'white' : 'black')};

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

const SideMenu = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    api.post('/auth/logout')
    window.location.href = '/'
  }

  return (
    <Menu>
      <MenuBar href={'/'} $isActive={pathname === '/'}>
        Home
      </MenuBar>
      <MenuBar href={'/product/all'} $isActive={pathname === '/product/all'}>
        All Products
      </MenuBar>
      <MenuBar href={'/product/best'} $isActive={pathname === '/product/best'}>
        BestSeller
      </MenuBar>
      {isLogin() && <Button onClick={handleLogout}>Logout</Button>}
    </Menu>
  )
})

export default SideMenu
