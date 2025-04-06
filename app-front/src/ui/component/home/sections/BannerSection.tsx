import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 배너 3개
  gap: 16px;
  padding: 50px 40px;
`

const BannerLink = styled.a`
  position: relative;
  width: 100%;
  height: 500px;
  display: block;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover img {
    filter: brightness(70%);
    transform: scale(1.05);
  }

  &:hover div {
    transform: translate(-50%, -50%) scale(1.05);
  }
`

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: all 0.3s ease;
`

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease;
`

export const BannerSection = () => {
  return (
    <Wrapper>
      <BannerLink href="/category/fruits">
        <BannerImage src="/image/peach.jpg" alt="Fruits" />
        <OverlayText>Fruits</OverlayText>
      </BannerLink>
      <BannerLink href="/category/vegetables">
        <BannerImage src="/image/bean.jpg" alt="Vegetables" />
        <OverlayText>Vegetables</OverlayText>
      </BannerLink>
      <BannerLink href="/category/drinks">
        <BannerImage src="/image/cream.jpg" alt="Drinks" />
        <OverlayText>Others</OverlayText>
      </BannerLink>
    </Wrapper>
  )
}

export default BannerSection
