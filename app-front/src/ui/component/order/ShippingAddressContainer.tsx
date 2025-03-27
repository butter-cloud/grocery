import styled from 'styled-components'
import CountrySelect from '@/ui/component/order/CountrySelect'

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Label = styled.label`
  font-weight: bold;
  font-size: 0.9rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const ShippingAddressContainer = () => {
  return (
    <Form>
      <RowContainer>
        <Label>Full Name</Label>
        <Input type="text" placeholder="e.g., John Smith" />
      </RowContainer>

      <RowContainer>
        <Label>Phone Number</Label>
        <Input type="tel" placeholder="+1 234 567 890" />
      </RowContainer>

      <RowContainer>
        <Label>Country</Label>
        <CountrySelect />
      </RowContainer>

      <RowContainer>
        <Label>Street Address</Label>
        <Input type="text" placeholder="e.g., 123 Main St" />
      </RowContainer>

      <RowContainer>
        <Label>City</Label>
        <Input type="text" placeholder="e.g., Los Angeles" />
      </RowContainer>

      <RowContainer>
        <Label>State / Province / Region</Label>
        <Input type="text" placeholder="e.g., California" />
      </RowContainer>

      <RowContainer>
        <Label>Postal Code</Label>
        <Input type="text" placeholder="e.g., 10001" />
      </RowContainer>
    </Form>
  )
}

export default ShippingAddressContainer
