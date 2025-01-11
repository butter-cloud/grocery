import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  padding: 0 50px;
  text-align: center;

  @media (max-width: 1200px) {
    width: 100%; /* Adjust width to 100% on smaller screens */
    padding: 0;
  }
`
const Img = styled.img`
  width: 70%; /* Default width */

  @media (max-width: 480px) {
    width: 100%; /* Adjust width to 100% on smaller screens */
  }
`

export default function ProductDetailImage(props: { imgSrc?: string }) {
  return (
    <>
      <Wrapper>
        <Img src={props.imgSrc ?? '/image/apple.png'} />
      </Wrapper>
    </>
  )
}
