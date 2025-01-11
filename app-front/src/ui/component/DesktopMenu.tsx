import styled from 'styled-components'

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
`

export default function DesktopMenu() {
  return (
    <>
      <Menu>
        <MenuBar href={'/product/best'}>BestSeller</MenuBar>
        <MenuBar href={'/product/all'}>All Products</MenuBar>
      </Menu>
    </>
  )
}
