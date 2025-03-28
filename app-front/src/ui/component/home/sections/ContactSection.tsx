import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 200px;
  padding: 50px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const Title = styled.div`
  font-family: serif;
  font-weight: 700;
  font-size: 5vw;
  border: 1px solid black;
  border-radius: 50%;
  padding: 20px;
  height: 100px;
  width: max-content;
  text-align: left;
`

const EmailContainer = styled.div`
  width: 50vw;
`

const EmailBox = styled.div`
  border: 3px solid lemonchiffon;
  border-radius: 10px;
  height: 70vh;
`

export const ContactSection = () => {
  return (
    <>
      <Wrapper>
        <Title>✳️ Contact Us !</Title>
        <EmailContainer>
          <EmailBox>here!</EmailBox>
        </EmailContainer>
      </Wrapper>
    </>
  )
}

export default ContactSection
