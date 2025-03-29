import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`
const CarouselWrapper = styled.div<{ width: number }>`
  display: flex;
  width: ${(props) => props.width}px;
  overflow: hidden;
`
const CarouselContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`

const ItemWrapper = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
`

const CarouselButton = styled.button<{ direction: string; visibility }>`
  position: relative;
  top: 50%;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  z-index: 10;
  visibility: ${(props) => props.visibility};
`

export const Carousel = ({ items, carouselWidth, itemWidth }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * itemWidth}px)`
    }
  }, [currentIndex, isTransitioning])

  const allowNextUntil = items.length - carouselWidth / itemWidth

  const handlePrev = () => {
    if (currentIndex === 0) return
    setCurrentIndex(currentIndex - 1)
  }

  const handleNext = () => {
    if (currentIndex === allowNextUntil) return
    setCurrentIndex(currentIndex + 1)
  }

  const handleTransitionEnd = () => {
    console.log('end!')
  }

  return (
    <>
      <Wrapper>
        <CarouselButton
          direction={'left'}
          onClick={handlePrev}
          visibility={currentIndex === 0 ? 'hidden' : 'unset'}
        >
          <ArrowBackIcon sx={{ width: 40, height: 40 }} />
        </CarouselButton>
        <CarouselWrapper width={carouselWidth}>
          <CarouselContainer
            ref={carouselRef}
            onTransitionEnd={handleTransitionEnd}
          >
            {items.map((item, index) => {
              return (
                <ItemWrapper key={index} width={itemWidth}>
                  {item}
                </ItemWrapper>
              )
            })}
          </CarouselContainer>
        </CarouselWrapper>
        <CarouselButton
          direction={'right'}
          onClick={handleNext}
          visibility={currentIndex === allowNextUntil ? 'hidden' : 'unset'}
        >
          <ArrowForwardIcon sx={{ width: 40, height: 40 }} />
        </CarouselButton>
      </Wrapper>
    </>
  )
}

export default Carousel
