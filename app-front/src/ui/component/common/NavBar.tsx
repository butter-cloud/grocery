import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import Logo from '@/ui/component/common/Logo'
import SideMenu from '@/ui/component/common/SideMenu'
import { useLogin } from '@/hook/useLogin'
import { Button } from '@/ui/component/common/Button'
import { useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  min-height: 80px;
  display: flex;
`

const Nav = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 1rem 2rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    //justify-content: center;
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 2rem;
  display: flex;
  align-items: center;
  &:hover {
    color: #f6fb7a;
  }
`

const MobileMenuButton = styled.div`
  //position: absolute;
  //top: 19px;
  //left: 25px;
  // color: ${({ theme }) => theme.colors.primary};
  // border: 2px solid ${({ theme }) => theme.colors.primary};
  color: #000;
  //border: 2px solid #000;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 999;
  font-size: 2rem;
  text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;
`

export default function NavBar() {
  const isMobile = useMediaQuery('(max-width:768px)')
  const isWide = useMediaQuery('(min-width:768px)')

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLogin } = useLogin()
  const menuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isMenuOpen) return
      if (event.screenX > 300) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  useEffect(() => {
    console.log('isWide: ', isWide)
  }, [])

  return (
    <>
      <Wrapper>
        <Nav>
          {/* menu button */}
          {isWide ? (
            <>
              <Button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen)
                }}
                style={{ zIndex: 999 }}
              >
                Menu
              </Button>
              {isMenuOpen && <SideMenu />}
            </>
          ) : (
            <>
              <MobileMenuButton
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen)
                }}
              >
                🥦
              </MobileMenuButton>
              {isMenuOpen && <SideMenu />}
            </>
          )}

          {/*center logo*/}
          {/*{(isMobile || isWide) && (*/}
            <NavLink href="/">
              <Logo fontSize={'40px'} />
            </NavLink>
          {/*// )}*/}

          {/* right links */}
          <NavLinks>
            <NavLink href="/cart">
              {isWide ? <Button>Cart</Button> : <>🛒</>}
            </NavLink>
            {isWide && isLogin === false && (
              <NavLink href="/auth/login">
                <Button>Login</Button>
              </NavLink>
            )}
          </NavLinks>
        </Nav>
      </Wrapper>
    </>
  )
}
