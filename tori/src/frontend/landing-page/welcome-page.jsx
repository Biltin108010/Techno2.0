import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const LogoWrapper = styled.div`
  width: 6rem;
  height: 6rem;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 17.5rem;
  gap: 1rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: -0.015em;
`;

const Paragraph = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  max-width: 17.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  border: ${(props) => (props.variant === 'outline' ? '1px solid #ddd' : 'none')};
  background-color: ${(props) => (props.variant === 'default' ? '#000' : 'transparent')};
  color: ${(props) => (props.variant === 'default' ? '#fff' : '#000')};
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: ${(props) => (props.variant === 'default' ? '#333' : '#f3f4f6')};
  }
`;

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  const navigateToCreateAccount = () => {
    navigate('/register'); // Navigate to the create account page
  };

  return (
    <Wrapper>
      {/* Logo */}
      <LogoWrapper>
        <Logo src="/images/tori_logo2.png" alt="Tori Logo" />
      </LogoWrapper>

      {/* Content */}
      <ContentWrapper>
        <Heading>Explore the app</Heading>
        <Paragraph>
          Discover all the tools and features designed to simplify your inventory and sales tracking.
        </Paragraph>
      </ContentWrapper>

      {/* Buttons */}
      <ButtonsWrapper>
        <Button variant="default" onClick={navigateToLogin}>
          Sign In
        </Button>
        <Button variant="outline" onClick={navigateToCreateAccount}>
          Create account
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
}
