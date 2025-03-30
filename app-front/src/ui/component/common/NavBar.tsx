import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import Logo from '@/ui/component/common/Logo'
import SideMenu from '@/ui/component/common/SideMenu'
import { useLogin } from '@/hook/useLogin'
import { Button } from '@/ui/component/common/Button'
import { useMediaQuery } from '@mui/material'

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
  color: #000;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 999;
  font-size: 2rem;
  text-shadow:
    -1px 0 #fff,
    0 1px #fff,
    1px 0 #fff,
    0 -1px #fff;
`

export default function NavBar() {
  const isWide = useMediaQuery('(min-width:768px)')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLogin } = useLogin()
  const menuRef = useRef<HTMLDivElement>(null)

  // 메뉴 외부 클릭 시 메뉴 닫기
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <Wrapper onClick={handleClick}>
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
              {isMenuOpen && <SideMenu ref={menuRef} />}
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
              {isMenuOpen && <SideMenu ref={menuRef} />}
            </>
          )}

          {/* center logo */}
          <NavLink href="/">
            <Logo fontSize={'40px'} />
          </NavLink>

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
