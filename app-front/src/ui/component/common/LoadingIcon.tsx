import styled from 'styled-components'
import { gsap } from 'gsap'
import { useEffect } from 'react'

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`
export const LoadingIcon = ({ item }) => {
  useEffect(() => {
    gsap.fromTo(
      '.loading-item',
      { rotation: 0 },
      {
        rotation: 360,
        duration: 2,
        repeat: -1, // 무한반복
        ease: 'linear',
        immediateRender: true, // 초기 지연 없이 바로 애니메이션 시작
      },
    )
  }, [])
  return (
    <Wrapper>
      <div className={'loading-item'}>{item}</div>
    </Wrapper>
  )
}
