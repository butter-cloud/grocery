import styled from 'styled-components'

interface TextProps {
  fontSize?: string
  color?: string
}

const Text = styled.div<TextProps>`
  font-family: serif;
  font-weight: 900;
  font-size: ${(props) => props.fontSize || '32px'};
  color: ${(props) => props.color || '#333'};
`
export default function Logo(props: TextProps) {
  const { fontSize, color } = props
  return (
    <>
      <Text fontSize={fontSize} color={color}>
        Org
      </Text>
    </>
  )
}
