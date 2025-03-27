import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  margin-top: 50px;
  width: 100%;
  padding: 50px;
`

const LeftSection = styled.div`
  width: 50%;
  padding: 10px;
`
const RightSection = styled.div`
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  font-style: italic;
  font-family: serif;
  color: #373737;
`

const Text = styled.p`
  font-size: 1rem;
`

export const FruitSection = () => {
  return (
    <>
      <Wrapper>
        <LeftSection>
          <img src="/image/apple.png" style={{ width: '60%' }} />
        </LeftSection>
        <RightSection>
          <Title>Our fruits</Title>
        </RightSection>
      </Wrapper>
    </>
  )
}

export default FruitSection