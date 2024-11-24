import React from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineEdit, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
`;

const ProfileCard = styled.div`
  width: 20rem;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem; /* Adjusted spacing */
`;

const BackButton = styled(IoIosArrowBack)`
  font-size: 1.5rem;
  color: black;
  margin-right: 0.5rem;

  
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const Separator = styled.div`
  height: 1px;
  background-color: #e5e7eb;
  margin: 1.5rem 0; /* Adjusted spacing */
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem; /* Adjusted spacing */
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 50%;
  padding: 0.2rem;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

const Name = styled.h2`
  margin-top: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const Contact = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const Stat = styled.div`
  text-align: center;
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 40%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Drop shadow */
`;

const StatValue = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
`;

const StatLabel = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ActionButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  margin-top: 0.75rem;
  cursor: pointer;
  border: none;
  color: ${({ danger }) => (danger ? "#ffffff" : "#374151")};
  background-color: ${({ danger }) =>
    danger ? "#ef4444" : "rgba(243, 244, 246, 1)"};

  &:hover {
    background-color: ${({ danger }) =>
      danger ? "#dc2626" : "rgba(229, 231, 235, 1)"};
  }
`;

const ActionIcon = styled.div`
  font-size: 1.25rem;
  margin-right: 0.75rem;
  color: ${({ danger }) => (danger ? "#ffffff" : "#374151")};
`;

function Profile() {
  return (
    <Container>
      <ProfileCard>
        {/* Header with Back Button and Title */}
        <HeaderContainer>
          <BackButton />
          <Title>Profile</Title>
        </HeaderContainer>
        <Separator />

        {/* Profile Header */}
        <ProfileHeader>
          <ProfileImageWrapper>
            <ProfileImage
              src="https://via.placeholder.com/80"
              alt="Profile"
            />
            <EditButton>✏️</EditButton>
          </ProfileImageWrapper>
          <Name>Moo Deng</Name>
          <Contact>youremail@domain.com | +01 234 567 89</Contact>
        </ProfileHeader>

        {/* Stats Section */}
        <StatsContainer>
          <Stat>
            <StatValue>3</StatValue>
            <StatLabel>Users</StatLabel>
          </Stat>
          <Stat>
            <StatValue>10</StatValue>
            <StatLabel>Items</StatLabel>
          </Stat>
        </StatsContainer>

        {/* Separator */}
        <Separator />

        {/* Action Buttons */}
        <ActionButton>
          <ActionIcon>
            <AiOutlineEdit />
          </ActionIcon>
          Edit Profile Information
        </ActionButton>
        <ActionButton>
          <ActionIcon>
            <AiOutlineSetting />
          </ActionIcon>
          Settings
        </ActionButton>
        <ActionButton danger>
          <ActionIcon danger>
            <AiOutlineLogout />
          </ActionIcon>
          Logout
        </ActionButton>
      </ProfileCard>
    </Container>
  );
}

export default Profile;
