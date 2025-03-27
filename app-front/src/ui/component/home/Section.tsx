import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  text-align: center;
`

const Section = ({ children }: { children: React.ReactNode }) => {
  return <Wrapper>{children}</Wrapper>
}

export default Section
