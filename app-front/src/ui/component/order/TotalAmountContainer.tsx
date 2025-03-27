import { Button } from '@/ui/component/common/Button'

export const TotalAmountContainer = () => {
  return (
    <>
      <h3>Total Amount</h3>
      <div style={{ margin: '1rem 0' }}>
        <p>Product Total: 0</p>
        <p>Discount: -0</p>
        <p>
          <strong>Total Amount: 0</strong>
        </p>
      </div>
      <Button variant={'primary'} width={'100%'}>
        Proceed to Payment
      </Button>
    </>
  )
}

export default TotalAmountContainer
