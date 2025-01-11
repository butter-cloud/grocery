import styled from 'styled-components'

const Menu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background-color: #f6fb7a;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
        <MenuBar href={'/product/all'}>BestSeller</MenuBar>
        <MenuBar href={'/product/all'}>All Products</MenuBar>
      </Menu>
    </>
  )
}
