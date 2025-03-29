import React from 'react'
import styled, { css } from 'styled-components'

type ButtonVariant = 'default' | 'primary' | 'outline'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  width?: string // 예: '100px', '100%', 'auto' 등
}

const StyledButton = styled.button<{
  variant: ButtonVariant
  width?: string
}>`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => props.width || 'auto'};
  height: 40px;

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background-color: ${props.theme.colors.primary};
      color: white;
      border: none;

      &:hover {
        background-color: ${props.theme.colors.secondary};
        color: ${props.theme.colors.primary};
        border: 1px solid ${props.theme.colors.primary};
      }
    `}

  ${(props) =>
    props.variant === 'outline' &&
    css`
      background-color: transparent;
      color: ${props.theme.colors.primary};
      border: 1px solid ${props.theme.colors.primary};

      &:hover {
        background-color: ${props.theme.colors.primary};
        color: white;
      }
    `}

  ${(props) =>
    (!props.variant || props.variant === 'default') &&
    css`
      background-color: white;
      color: black;
      border: 1px solid grey;

      &:hover {
        background-color: #f0f0f0;
      }
    `}
`

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  width,
  children,
  ...rest
}) => {
  return (
    <StyledButton variant={variant} width={width} {...rest}>
      {children}
    </StyledButton>
  )
}
