import { useState } from 'react'
import styled from 'styled-components'

const SectionBox = styled.div`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
`

const SectionContent = styled.div<{ $isOpen: boolean }>`
  margin-top: 1rem;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
`

const ToggleButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
`

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
}

const CollapsibleBox = ({ title, children }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSection = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <SectionBox>
      <ToggleButton onClick={toggleSection}>
        <span>{title}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </ToggleButton>
      <SectionContent $isOpen={isOpen}>{children}</SectionContent>
    </SectionBox>
  )
}

export default CollapsibleBox
