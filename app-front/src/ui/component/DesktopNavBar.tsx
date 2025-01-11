import styled from 'styled-components'
import {useEffect, useState} from 'react'
import api from "@/config/axiosInstance";

const Wrapper = styled.div`
  width: 100%;
  background-color: #29cf49;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  font-style: italic;
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
    color: #007bff;
  }
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  color: black;
  border: 1px solid grey;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #bcbbbb;
  }
`

export default function DesktopNavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <Wrapper>
        <Nav>
          <NavLink href="/">
            <Logo>Grocery Store</Logo>
          </NavLink>
          <NavLinks>
            <NavLink href="/product/all">Products</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>

            <NavLink href="/auth/register">
              <Button>Sign Up</Button>
            </NavLink>
            <NavLink href="/auth/login">
              <Button>Log In</Button>
            </NavLink>
          </NavLinks>
        </Nav>
      </Wrapper>
    </>
  )
}
