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
              <img
                src="/images/facebook_logo.png"
                alt="Facebook"
                width={20}
                height={20}
              />
              Facebook
            </SocialButton>
            <SocialButton>
              <img
                src="/images/google_logo.png"
                alt="Google"
                width={20}
                height={20}
              />
              Google
            </SocialButton>
            <SocialButton>
              <img
                src="/images/apple_logo.png"
                alt="Apple"
                width={20}
                height={20}
              />
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
