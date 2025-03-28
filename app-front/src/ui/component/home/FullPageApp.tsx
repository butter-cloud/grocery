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
`

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  text-align: center;

  @media (min-width: 768px) {
    height: 100vh;
  }
`

const FullPageApp = ({ sections }: { sections: JSX.Element[] }) => {
  const [currentSection, setCurrentSection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

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

  // 모바일 화면 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768) // 모바일 화면 크기 기준 (768px 이하)
    }

    checkMobile() // 초기 로드 시 체크
    window.addEventListener('resize', checkMobile) // 화면 크기 변경 시 체크

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // 스크롤 이벤트 등록 및 정리
  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [currentSection])

  return (
    <>
      {isMobile ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {sections.map((section, index) => (
              <Section key={index}>{section}</Section>
            ))}
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </>
  )
}

export default FullPageApp
