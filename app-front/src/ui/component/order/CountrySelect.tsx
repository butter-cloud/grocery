import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`

interface Country {
  code: string
  name: string
}

export default function CountrySelect() {
  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    fetch('/data/countries.json')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data)
      })
      .catch((err) => {
        console.error('Failed to load country list', err)
      })
  }, [])

  return (
    <Select>
      <option value="">Select Country</option>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </Select>
  )
}
