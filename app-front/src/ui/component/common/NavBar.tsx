import styled from 'styled-components'
import { useState } from 'react'
import Logo from '@/ui/component/common/Logo'
import DesktopMenu from '@/ui/component/common/DesktopMenu'

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  display: flex;
  align-items: center;
  &:hover {
    color: #f6fb7a;
  }
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  color: black;
  border: 1px solid grey;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #bcbbbb;
  }
`

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Wrapper>
        <Nav>
          <Button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen)
            }}
            style={{ zIndex: 999 }}
          >
            Menu
          </Button>
          {isMenuOpen ? <DesktopMenu /> : <></>}
          <NavLink href="/">
            <Logo fontSize={'40px'} />
          </NavLink>

          <NavLinks>
            <NavLink href="/auth/login">
              <Button>Cart</Button>
            </NavLink>
          </NavLinks>
        </Nav>
      </Wrapper>
    </>
  )
}
