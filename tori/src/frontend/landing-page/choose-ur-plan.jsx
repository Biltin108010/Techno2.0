import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// Styled components
export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 1rem;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
`;

export const BackButton = styled(IoIosArrowBack)`
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    color: #000;
  }
`;

export const Logo = styled.img`
  margin-left: auto;
  width: 2rem;
  height: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin-top: 0.5rem;
`;

export const Subtitle = styled.p`
  color: #555;
  margin: 0.5rem 1.5rem 1.5rem;
  font-size: 0.875rem;
  text-align: center;
`;

const PlanCard = styled.div`
  border: 1px solid ${({ selected }) => (selected ? "#000" : "#ccc")};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: border-color 0.3s ease;
  background-color: ${({ selected }) => (selected ? "#f9f9f9" : "#fff")};

  &:hover {
    border-color: #000;
  }
`;

const PlanTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #111;
`;

const PlanPrice = styled.p`
  font-size: 0.875rem;
  color: #333;
  margin: 0.5rem 0;
`;

const PlanDetails = styled.p`
  font-size: 0.75rem;
  color: #555;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const ContinueButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #000;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.5rem;

  &:hover {
    background-color: #333;
  }
`;

// Styled notification popup
const Notification = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 1rem 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  background-color: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

// Component definition
function ChooseYourPlan() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      navigate("/seller/home"); // Navigate to the next page
    } else {
      setShowNotification(true); // Show popup notification
    }
  };

  const closeNotification = () => {
    setShowNotification(false); // Close popup notification
  };

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <BackButton onClick={() => navigate(-1)} />
          <Title>Choose Your Plan</Title>
          <Logo src="/images/tori_logo2.png" alt="Logo" />
        </CardHeader>
        <Subtitle>To complete the sign-up process, please choose a subscription plan.</Subtitle>
        <CardContent>
          <PlanCard selected={selectedPlan === "starter"} onClick={() => handlePlanSelection("starter")}>
            <PlanTitle>Starter (up to 4 users)</PlanTitle>
            <PlanPrice>₱250.00 / mo</PlanPrice>
          </PlanCard>
          <PlanCard selected={selectedPlan === "premium"} onClick={() => handlePlanSelection("premium")}>
            <PlanTitle>Premium (up to 10 users)</PlanTitle>
            <PlanPrice>₱500.00 / mo</PlanPrice>
          </PlanCard>
          <PlanCard selected={selectedPlan === "free"} onClick={() => handlePlanSelection("free")}>
            <PlanTitle>Free</PlanTitle>
            <PlanDetails>Up to 2 users only</PlanDetails>
          </PlanCard>
          <ContinueButton onClick={handleContinue}>Continue</ContinueButton>
        </CardContent>
      </Card>

      {showNotification && (
        <>
          <Overlay />
          <Notification>
            <p>Please select a plan before continuing.</p>
            <CloseButton onClick={closeNotification}>OK</CloseButton>
          </Notification>
        </>
      )}
    </Wrapper>
  );
}

export default ChooseYourPlan;
