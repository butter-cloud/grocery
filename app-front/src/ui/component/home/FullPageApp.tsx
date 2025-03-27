import React, { useState, useEffect, JSX } from 'react'
import styled from 'styled-components'

const FullPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: -999;
  scrollbar-width: none;
`

const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  text-align: center;
`

const FullPageApp = ({ sections }: { sections: JSX.Element[] }) => {
  const [currentSection, setCurrentSection] = useState(0)

  // 스크롤 이벤트 핸들러
  const handleScroll = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      // 아래로 스크롤
      if (currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1)
      }
    } else {
      // 위로 스크롤
      if (currentSection > 0) {
        setCurrentSection((prev) => prev - 1)
      }
    }
  }

  // 스크롤 이벤트 등록 및 정리
  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [currentSection])

  return (
    <FullPageWrapper
      style={{
        transform: `translateY(-${currentSection * 100}vh)`, // 스크롤에 따라 위치 이동
      }}
    >
      {sections.map((section, index) => (
        <Section key={index} className="fullpage-section">
          {section}
        </Section>
      ))}
    </FullPageWrapper>
  )
}

export default FullPageApp
