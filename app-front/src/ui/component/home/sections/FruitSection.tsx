import styled from 'styled-components'
import { Button } from '@/ui/component/common/Button'

const Wrapper = styled.div`
  display: flex;
  margin-top: 50px;
  width: 100%;
  padding: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    max-height: calc(100vh - 80px);
    margin-top: 0;
    padding: 10px;
  }
`

const LeftSection = styled.div`
  width: 45%;
  padding: 10px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`
const RightSection = styled.div`
  width: 50%;
  padding: 10px 30px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 50px;
    padding: 10px;
  }
`

const Img = styled.img`
  width: 300px;

  @media (max-width: 768px) {
    width: 200px;
  }
`

const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  font-style: italic;
  font-family: serif;
  color: #373737;
`

const Text = styled.p`
  font-size: 1.1rem;
`

export const FruitSection = () => {
  return (
    <>
      <Wrapper>
        <LeftSection>
          <Img src="/image/apple.png" />
        </LeftSection>
        <RightSection>
          <Title>Our fruits</Title>
          <Text>
            Our fruits are picked fresh every day from trusted farms to ensure
            the highest quality. Each piece is packed with natural sweetness and
            rich flavor. We carefully select only the ripest and juiciest
            fruits, so they’re ready to enjoy as soon as they reach you. With
            every bite, you’ll taste the freshness that sets us apart. Enjoy the
            best fruits of the season, delivered straight to your table. Taste
            the difference that truly fresh fruit can make —because you deserve
            nothing less.
          </Text>
          <Button>Let’s Get Fruity !</Button>
        </RightSection>
      </Wrapper>
    </>
  )
}

export default FruitSection
