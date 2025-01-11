import styled from 'styled-components'

const Text = styled.div`
  font-family: sans-serif;
  font-size: 4rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 2rem 1rem;
`
export default function MenuTitle(props: { title: string }) {
  return (
    <>
      <Text>{props.title ?? 'Title'}</Text>
    </>
  )
}
