import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa'; // Icon for the "+" tab
import Tab1 from './tab1/tab1';
import Tab2 from './tab2/tab2';
import Tab3 from './tab3/tab3';
import './TabsContainer.css';
import supabase from '../../../backend/supabaseClient';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function TabContainer() {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState('');
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [inviterInventory, setInviterInventory] = useState([]);
  const [secondInvitedUserInventory, setSecondInvitedUserInventory] = useState([]);
  const [userTeamEmails, setUserTeamEmails] = useState([]); 
  const [teamNum, setTeamNum] = useState(null); 
  const [approvalStatus, setApprovalStatus] = useState(null); 
  const [isInTeam, setIsInTeam] = useState(false); // Tracks if the user is in a team
  const [isPendingInvite, setIsPendingInvite] = useState(false); // Track if the invite is pending

  const navigate = useNavigate();

  // Style the Back Button with styled-components (if needed)
  const BackButton = styled(IoIosArrowBack)`
    font-size: 1.5rem;
    color: #333;
    cursor: pointer;
    margin-right: 2px;

    &:hover {
      color: #000;
    }
  `;

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user details:', error);
        return;
      }
      if (user) {
        setEmail(user.email);
        const { data: userData, error: roleError } = await supabase
          .from('users')
          .select('username, role')
          .eq('email', user.email)
          .single();

        if (roleError) {
          console.error('Error fetching user role and username:', roleError);
        } else if (userData) {
          setUsername(userData.username);
          setUserRole(userData.role);
        }

        const { data: teamData, error: teamError } = await supabase
          .from('team')
          .select('team_num, approved')
          .eq('invite', user.email)
          .single();

        if (teamError) {
          console.error('Error fetching team data:', teamError);
          setIsInTeam(false); // User not found in team table
        } else if (teamData) {
          setTeamNum(teamData.team_num);
          setApprovalStatus(teamData.approved);
          setIsInTeam(true); // User is part of a team

          if (teamData.approved === false) {
            setIsPendingInvite(true); // User's invite is pending
          }

          const { data: teamMembers, error: membersError } = await supabase
            .from('team')
            .select('invite')
            .eq('team_num', teamData.team_num)
            .neq('invite', user.email);

          if (membersError) {
            console.error('Error fetching team members:', membersError);
          } else if (teamMembers) {
            const invitedEmails = teamMembers.map((member) => member.invite);

            const usersData = await Promise.all(
              invitedEmails.map(async (inviteEmail) => {
                const { data: invitedUser, error } = await supabase
                  .from('users')
                  .select('username')
                  .eq('email', inviteEmail)
                  .single();
                if (error) {
                  console.error(`Error fetching invited user data for ${inviteEmail}:`, error);
                } else if (invitedUser) {
                  return { email: inviteEmail, username: invitedUser.username };
                }
                return null;
              })
            );

            setInvitedUsers(usersData.filter((user) => user !== null));

            if (invitedEmails.length > 0 && approvalStatus) {
              const { data: inviterInventoryData, error: inventoryError } = await supabase
                .from('inventory')
                .select('*')
                .eq('email', invitedEmails[0]);

              if (inventoryError) {
                console.error('Error fetching inviter inventory:', inventoryError);
              } else {
                setInviterInventory(inviterInventoryData);
              }
            }

            if (invitedEmails.length > 1 && approvalStatus) {
              const { data: secondInvitedUserInventoryData, error: secondInventoryError } = await supabase
                .from('inventory')
                .select('*')
                .eq('email', invitedEmails[1]);

              if (secondInventoryError) {
                console.error('Error fetching second invited user inventory:', secondInventoryError);
              } else {
                setSecondInvitedUserInventory(secondInvitedUserInventoryData);
              }
            }
          }
        }
      }
    };

    const fetchAllUsers = async () => {
      const { data: allUsers, error } = await supabase
        .from('users')
        .select('username');

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(allUsers);
      }
    };

    fetchUserDetails();
    fetchAllUsers();
  }, [approvalStatus]); // Dependency on approvalStatus ensures refetching of data on status change

  useEffect(() => {
    setActiveTab(0); // Default to Tab 1 (activeTab 0)
  }, [users]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Logged-in user's tab
        return <Tab1 isEditing={isEditing} handleEditMode={toggleEditMode} />;
      case 1: // First invited user's inventory
        return (
          <Tab2
            isEditing={isEditing}
            userEmail={invitedUsers[0]?.email} // Email of the inventory owner
            currentLoggedInUserEmail={email} // Current logged-in user's email
            inviterInventory={inviterInventory}
            userTeamEmails={userTeamEmails}
          />
        );
      case 2: // Second invited user's inventory
        return (
          <Tab3
            isEditing={isEditing}
            userEmail={invitedUsers[1]?.email} // Email of the inventory owner
            currentLoggedInUserEmail={email} // Current logged-in user's email
            secondInvitedInventory={secondInvitedUserInventory}
          />
        );
      case 3: // Pending invite or "+" tab
        return (
          <div>
            {isPendingInvite ? (
              <p>Your invitation to join the team is pending approval.</p>
            ) : (
              <p>Locate Invite at: Profile/Invite Team</p>
            )}
            <button
              className="inviteButton"
              onClick={() => navigate("/seller/invite-team")}
            >
              View Invitation Details
            </button>
          </div>
        );
      default:
        return null;
    }
  };
  

  const shouldShowEditButton = () => {
    if (userRole === 'admin') {
      return true;
    }
    if (userRole === 'seller' && activeTab === 0) {
      return true;
    }
    return false;
  };

  return (
    <div className="tab-container">
      <div className="header">
        <div className="header-wrapper">
          <div className="title">
            {isEditing && (
              <button className="back-button-container" onClick={toggleEditMode}>
                <BackButton />
              </button>
            )}
            <h2>Inventory</h2>
            <div className="tabscontentlogo">
              <img src="https://res.cloudinary.com/dcd5cnr4m/image/upload/v1733254195/Untitled_design_7_td7pot.png" alt="Logo" width={50} height={50} />
            </div>
          </div>
        </div>

        <div className="search-box-wrapper">
          <input
            type="search"
            placeholder="Search product"
            className="search-input"
          />
          {!isEditing && shouldShowEditButton() && (
            <button className="edit-button" onClick={toggleEditMode}>
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="tabs">
        <button
          onClick={() => setActiveTab(0)}
          className={`tab ${activeTab === 0 ? 'active-tab' : ''}`}
        >
          {username}
        </button>
        {invitedUsers.length > 0 && approvalStatus && (
          <button
            onClick={() => setActiveTab(1)}
            className={`tab ${activeTab === 1 ? 'active-tab' : ''}`}
          >
            {invitedUsers[0]?.username || 'Tab 2'}
          </button>
        )}
        {invitedUsers.length > 1 && approvalStatus && (
          <button
            onClick={() => setActiveTab(2)}
            className={`tab ${activeTab === 2 ? 'active-tab' : ''}`}
          >
            {invitedUsers[1]?.username || 'Tab 3'}
          </button>
        )}
        <button
          onClick={() => setActiveTab(3)}
          className={`tab ${activeTab === 3 ? 'active-tab' : ''}`}
        >
          {isPendingInvite ? 'Pending Invite' : <FaPlus />}
        </button>
      </div>

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}
