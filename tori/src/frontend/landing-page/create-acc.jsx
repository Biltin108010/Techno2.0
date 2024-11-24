'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom' // Changed import to use react-router-dom
import { Eye, EyeOff } from 'lucide-react'
import styled from 'styled-components'

// Styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: white;
`

const Container = styled.div`
  width: 100%;
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Logo = styled.div`
  display: flex;
  justify-content: center;
`

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
`

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #3b82f6;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => (props.primary ? '#000' : 'transparent')};
  color: ${(props) => (props.primary ? '#fff' : '#000')};
  border: ${(props) => (props.primary ? 'none' : '1px solid #ddd')};
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: ${(props) => (props.primary ? '#333' : '#f3f4f6')};
  }
`

const IconButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const SocialButton = styled(Button)`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
`

const DividerText = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: uppercase;
`

const AlreadyAccountText = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
`

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <Wrapper>
      <Container>
        {/* Logo */}
        <Logo>
          <svg
            viewBox="0 0 100 100"
            className="w-16 h-16"
            aria-hidden="true"
          >
            <path
              d="M20 20 L50 20 L50 50 L80 50 L80 80 L50 80 L50 50 L20 50 Z"
              fill="#4B5563"
            />
            <path
              d="M50 50 L80 20 L80 50 L50 80 L20 80 L20 50 L50 20"
              fill="#9CA3AF"
            />
          </svg>
        </Logo>

        {/* Heading */}
        <Heading>Sign Up</Heading>

        {/* Form */}
        <Form>
          {/* Email Input */}
          <div>
            <Label htmlFor="email">Email</Label>
            <InputField
              id="email"
              type="email"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Password Input */}
          <div style={{ position: 'relative' }}>
            <Label htmlFor="password">Create a password</Label>
            <InputField
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="must be 8 characters"
              required
            />
            <IconButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </IconButton>
          </div>

          {/* Confirm Password Input */}
          <div style={{ position: 'relative' }}>
            <Label htmlFor="confirm-password">Confirm password</Label>
            <InputField
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="repeat password"
              required
            />
            <IconButton
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </IconButton>
          </div>

          <Button primary>Create Account</Button>
        </Form>

        {/* Social Login */}
        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
          Or Register with
        </div>
        <SocialButtons>
          <SocialButton>
            <svg
              className="w-5 h-5 text-[#1877F2]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
            </svg>
          </SocialButton>
          <SocialButton>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
              />
              <path
                fill="#34A853"
                d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
              />
              <path
                fill="#4A90E2"
                d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
              />
              <path
                fill="#FBBC05"
                d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
              />
            </svg>
          </SocialButton>
          <SocialButton>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </SocialButton>
        </SocialButtons>

        {/* Login Link */}
        <AlreadyAccountText>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: '600', color: '#3b82f6' }}>
            Log in
          </Link>
        </AlreadyAccountText>
      </Container>
    </Wrapper>
  )
}
