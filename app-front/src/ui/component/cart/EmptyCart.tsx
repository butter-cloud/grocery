import styled from 'styled-components'
import { Button } from '@/ui/component/common/Button'
import { PAGE_URLS } from '@/constants/pageUrls'
import Link from 'next/link'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`
export const EmptyCart = () => {
  return (
    <Wrapper>
      <span>⚠️ Oops! Your cart is empty.</span>
      <Link href={PAGE_URLS.PRODUCT_ALL}>
        <Button width={'200px'}>Go shopping</Button>
      </Link>
    </Wrapper>
  )
}
