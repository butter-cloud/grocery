import { useState } from 'react'
import styled from 'styled-components'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useTheme } from 'styled-components'

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

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ToggleButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
`

interface CollapsibleSectionProps {
  title: React.ReactNode
  children: React.ReactNode
}

const CollapsibleBox = ({ title, children }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const theme = useTheme()

  const toggleSection = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <SectionBox>
      <ToggleButton onClick={toggleSection}>
        <TitleWrapper>{title}</TitleWrapper>
        {isOpen ? (
          <KeyboardArrowUpIcon style={{ color: theme.colors.primary }} />
        ) : (
          <KeyboardArrowDownIcon style={{ color: theme.colors.primary }} />
        )}
      </ToggleButton>
      <SectionContent $isOpen={isOpen}>{children}</SectionContent>
    </SectionBox>
  )
}

export default CollapsibleBox
