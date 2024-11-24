import styled from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom' // Updated to use Link from react-router-dom
import { Eye, EyeOff } from 'lucide-react'

// Styled components
const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 1rem;
`

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const CardHeader = styled.div`
  text-align: center;
  padding: 1.5rem;
`

const Logo = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.5rem;
`

const CardContent = styled.div`
  padding: 1.5rem;
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
  margin-top: 0.25rem;
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

const ForgotPasswordLink = styled(Link)`
  font-size: 0.875rem;
  color: #3b82f6;
  text-decoration: none;
  &:hover {
    color: #2563eb;
  }
`

const SocialButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const Divider = styled.div`
  position: relative;
  margin: 1rem 0;
`

const DividerText = styled.span`
  background-color: white;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  color: #6b7280;
`
const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordInput = styled(InputField)`
  padding-right: 2.5rem; /* Add space for the eye icon */
`;

const EyeButton = styled.button`
  position: absolute;
  right: 0.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
`;
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('helloworld@gmail.com')
  const [password, setPassword] = useState('')

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <Logo>
            <img
              src="/images/tori_logo2.png"
              alt="Logo"
              width={48}
              height={48}
              className="dark:invert"
            />
          </Logo>
          <Title>Sign In</Title>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="email">Email address</Label>
            <InputField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <InputContainer>
              <PasswordInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <EyeButton
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </EyeButton>
            </InputContainer>
          </div>
          <div style={{ textAlign: 'right' }}>
            <ForgotPasswordLink to="#">Forgot password?</ForgotPasswordLink>
          </div>
          <Button primary>Log in</Button>
          <Divider>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <DividerText>Or Login with</DividerText>
          </Divider>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <SocialButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="16"
                height="16"
                className="text-[#1877F2]"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.09h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.917.001c-1.503 0-1.794.715-1.794 1.763v2.31h3.588l-.467 3.616h-3.12V24h6.116C23.407 24 24 23.407 24 22.675V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
              Facebook
            </SocialButton>

            <SocialButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="16"
                height="16"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.38 0 5.62 1.47 6.91 2.71l5.08-4.93C32.95 4.27 28.95 3 24 3 14.69 3 7.16 8.93 4.26 17.05l6.25 4.86C12.24 15.45 17.61 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.09 24.49c0-1.61-.14-2.79-.45-4.02H24v7.66h12.65c-.26 2-1.67 5.03-4.83 7.07l7.36 5.72c4.29-3.95 6.91-9.77 6.91-16.43z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.51 28.08C9.51 25.9 9 23.56 9 21s.51-4.9 1.51-7.08l-6.25-4.86C2.33 12.52 1 16.6 1 21s1.33 8.48 4.26 11.94l6.25-4.86z"
                />
                <path
                  fill="#34A853"
                  d="M24 39c-5.48 0-10.13-1.81-13.49-4.94l-6.25 4.86C7.16 41.07 14.69 47 24 47c4.9 0 9.17-1.61 12.35-4.37l-7.36-5.72C27.44 37.86 25.78 39 24 39z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              Google
            </SocialButton>

            <SocialButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M16.365 1.43c.126 1.28-.477 2.523-1.24 3.31-.834.88-2.094 1.563-3.33 1.47-.145-1.23.506-2.563 1.26-3.326.866-.874 2.325-1.535 3.31-1.454z" />
                <path d="M19.965 15.373c-.654 1.48-.934 2.083-1.74 3.31-1.115 1.68-2.685 3.755-4.735 3.765-1.735.015-2.178-1.12-4.505-1.12-2.342 0-2.86 1.11-4.588 1.14-1.845.03-3.33-2-4.395-3.675-3.01-4.735-3.21-10.53-1.46-13.395 1.015-1.695 2.655-2.755 4.44-2.755 2.035 0 3.32 1.155 4.505 1.155 1.135 0 2.99-1.41 5.05-1.2.87.035 3.31.35 4.785 2.615-.125.09-2.915 1.705-2.78 4.735.1 2.67 3.14 3.665 3.225 3.7-.08.25-.505 1.48-1.42 2.95z" />
              </svg>
              Apple
            </SocialButton>
          </div>
          <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
            Don't have an account?{' '}
            <ForgotPasswordLink to="/register">Sign up</ForgotPasswordLink>
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  )
}
