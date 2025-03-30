'use client'

import { Skeleton, Stack } from '@mui/material'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;
  padding: 10px;
`

const ProductImageWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 110%;
  overflow: hidden;
`

export const ProductCardSkeleton = () => {
  return (
    <Wrapper>
      <ProductImageWrapper>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </ProductImageWrapper>
      <Stack spacing={0} mt={1}>
        <Skeleton variant="text" width="80%" height={40} />
        <Skeleton variant="text" width="40%" height={40} />
      </Stack>
    </Wrapper>
  )
}

export default ProductCardSkeleton
