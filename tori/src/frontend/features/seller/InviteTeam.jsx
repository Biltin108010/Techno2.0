import React, { useState, useEffect } from "react";
import supabase from "../../../backend/supabaseClient"; // Import your Supabase client
import { useNavigate } from "react-router-dom"; // For navigating between pages
import "./InviteTeam.css"
import { IoIosArrowBack } from 'react-icons/io';
import styled from "styled-components";

const BackButton = styled(IoIosArrowBack)`
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  margin-right: 2px;

  &:hover {
    color: #000;
  }
`;

function InviteTeam() {
  const [emailInput, setEmailInput] = useState(""); // Input field for inviting email
  const [teamData, setTeamData] = useState([]); // Data for team members
  const [pendingInvites, setPendingInvites] = useState([]); // Pending invites
  const [loading, setLoading] = useState(true); // Loading state
  const [isAlreadyInvited, setIsAlreadyInvited] = useState(false); // Track if current user is already invited
  const navigate = useNavigate(); // Navigate hook
  const [currentUserEmail, setCurrentUserEmail] = useState(""); // Current user's email
  const [currentTeamNum, setCurrentTeamNum] = useState(null); // Current user's team number
  const [isTeamFull, setIsTeamFull] = useState(false); // Track if the team is full
  const [isInviter, setIsInviter] = useState(false); // Track if the current user is the inviter
  const [isApproved, setIsApproved] = useState(false); // Track if the current user is approved
  const [canInvite, setCanInvite] = useState(true); // Track if the user can invite others

  // Fetch team data
  const fetchTeamData = async () => {
    try {
      setLoading(true);
  
      // Fetch current user's team number (if any)
      const { data: teamInfo, error: teamError } = await supabase
        .from("team")
        .select("team_num")
        .eq("invite", currentUserEmail)
        .limit(1);
  
      if (teamError) {
        console.error("Error fetching team number:", teamError.message);
        return;
      }
  
      if (teamInfo?.length === 0) {
        // No team found for the current user, so they are allowed to create a new team
        setCurrentTeamNum(null);
        setIsInviter(true); // User is the inviter
        setCanInvite(true); // They can invite others to form a new team
      } else {
        // Existing team, handle normally
        const teamNum = teamInfo?.[0]?.team_num || currentTeamNum;
        setCurrentTeamNum(teamNum);
  
        // Fetch all members of the team
        const { data: teamData, error: teamDataError } = await supabase
          .from("team")
          .select("invite, approved, team_num, inviter")
          .eq("team_num", teamNum);
  
        if (teamDataError) throw teamDataError;
  
        setTeamData(teamData);
  
        // Filter pending invites where approved is false
        const pendingInvitesData = teamData.filter(member => member.approved === false);
        setPendingInvites(pendingInvitesData);
        
  
        // Check if the user has been invited already or is an inviter
        const user = teamData.find((member) => member.invite === currentUserEmail);
        setIsInviter(user?.inviter || false);
        setIsApproved(user?.approved || false);
        
        // Check if the team is full
        const teamSize = teamData.filter((member) => member.approved).length;
        setIsTeamFull(teamSize >= 4); // Assuming a team can have up to 4 members
        
        setCanInvite(!(user?.inviter === false && user?.approved === false));
      }
    } catch (err) {
      console.error("Error fetching team data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkIfCartHasPreviewOrder = async () => {
    try {
      const { data, error } = await supabase
        .from("add_cart")
        .select("user_prev")
        .eq("user_prev", currentUserEmail); // Check if current user has any preview orders
    
      if (error) throw error;
  
      return data.length > 0; // If there are preview orders, return true
    } catch (err) {
      console.error("Error checking add_cart preview orders:", err.message);
      return false; // Assume no preview orders in case of an error
    }
  };
  
  

  // Get the current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setCurrentUserEmail(user.email);
      } catch (err) {
        console.error("Error fetching current user:", err.message);
      }
    };
    fetchCurrentUser();
  }, []); // Runs once on component mount

  // Fetch team data once current user email is available
  useEffect(() => {
    if (currentUserEmail) {
      fetchTeamData(); // Fetch all data initially
    }
  }, [currentUserEmail]);

  // Handle sending an invite
// Handle sending an invite
// Handle sending an invite
const handleInvite = async () => {
  if (!emailInput.trim()) {
    alert("Please enter a valid email.");
    return;
  }
  if (await checkIfCartHasPreviewOrder()) {
    alert("You cannot invite members while your Preview Order is not cleared.");
    return;
  }
  if (emailInput === currentUserEmail) {
    alert("You cannot invite yourself!");
    return;
  }

  try {
    // Fetch current user's team info and check if they are already part of a team
    const { data: inviterData, error: inviterError } = await supabase
      .from("team")
      .select("team_num, approved")
      .eq("invite", currentUserEmail)
      .eq("approved", true)
      .limit(1);

    if (inviterError) {
      console.error("Error fetching inviter data:", inviterError.message);
      return;
    }

    let teamNum = currentTeamNum;
    if (!inviterData || inviterData.length === 0) {
      console.log("Creating new team for the user...");

      // Fetch the max team number and increment
      const { data: maxTeamNumData, error: maxTeamNumError } = await supabase
        .from("team")
        .select("team_num")
        .order("team_num", { ascending: false })
        .limit(1);

      if (maxTeamNumError) throw maxTeamNumError;

      const newTeamNum = (maxTeamNumData?.[0]?.team_num || 0) + 1;
      teamNum = newTeamNum;

      // Insert a new row with the current user and their team number
      const { error: insertError } = await supabase
        .from("team")
        .insert([{ invite: currentUserEmail, approved: true, team_num: teamNum, inviter: true }]);

      if (insertError) throw insertError;

      setCurrentTeamNum(teamNum); // Update the state with the new team number
    }

    // Fetch the count of members in the team to check if it's already full
    const { data: teamMembers, error: teamMembersError } = await supabase
      .from("team")
      .select("invite")
      .eq("team_num", teamNum);

    if (teamMembersError) throw teamMembersError;

    // Check the team size (count of team members with the same team_num)
    const teamSize = teamMembers.length;
    if (teamSize >= 3) {
      alert("Your team is already full!");
      return;
    }

    // Check if the person is already invited
    const { data: duplicateInvite, error: duplicateError } = await supabase
      .from("team")
      .select("*")
      .eq("invite", emailInput.trim())
      .eq("team_num", teamNum)
      .limit(1);

    if (duplicateError) throw duplicateError;

    if (duplicateInvite.length > 0) {
      alert("This person has already been invited.");
      return;
    }

    // Insert the invite with the correct team number
    const { error: inviteError } = await supabase
      .from("team")
      .insert([{
        invite: emailInput.trim(),
        approved: false,
        team_num: teamNum,
        inviter: false,
      }]);

    if (inviteError) throw inviteError;

    alert("Invite sent successfully!");
    setEmailInput(""); // Reset input field
    fetchTeamData(); // Refresh the team data
  } catch (err) {
    console.error("Error sending invite:", err.message);
    alert("Failed to send invite.");
  }
};




  // Handle approval status change
  const handleApprovalChange = async (invite, value) => {
    try {
      if (value === false) {
        const { error } = await supabase
          .from("team")
          .delete()
          .eq("invite", invite)
          .eq("team_num", currentTeamNum);

        if (error) throw error;

        alert("Invite rejected and removed successfully!");
      } else {
        const { error } = await supabase
          .from("team")
          .update({ approved: value })
          .eq("invite", invite)
          .eq("team_num", currentTeamNum);

        if (error) throw error;

        alert("Invite approved successfully!");
      }

      fetchTeamData(); // Refresh the table
    } catch (err) {
      console.error("Error updating approval status:", err.message);
      alert("Failed to update approval status.");
    }
  };

  // Handle remove account
  const handleRemoveAccount = async (invite) => {
    try {
      const { error } = await supabase
        .from("team")
        .delete()
        .eq("invite", invite)
        .eq("team_num", currentTeamNum);

      if (error) throw error;

      alert("Account removed successfully!");
      fetchTeamData(); // Refresh the table
    } catch (err) {
      console.error("Error removing account:", err.message);
      alert("Failed to remove account.");
    }
  };

  // Handle leave team
  const handleLeaveTeam = async () => {
    if (await checkIfCartHasPreviewOrder()) {
      alert("You cannot leave the team while your Preview Order is not cleared.");
      return;
    }
    try {
      const { error } = await supabase
        .from("team")
        .delete()
        .eq("invite", currentUserEmail)
        .eq("team_num", currentTeamNum);
  
      if (error) throw error;
  
      alert("You have left the team!");
      fetchTeamData();
      navigate(-1); // Navigate back to the previous page
    } catch (err) {
      console.error("Error leaving team:", err.message);
      alert("Failed to leave the team.");
    }
  };
  

  // Handle disband team
  const handleDisbandTeam = async () => {
    if (await checkIfCartHasPreviewOrder()) {
      alert("You cannot disband the team while your Preview Order is not cleared.");
      return;
    }
    try {
      const { error } = await supabase
        .from("team")
        .delete()
        .eq("team_num", currentTeamNum);
  
      if (error) throw error;
  
      alert("The team has been disbanded!");
      fetchTeamData();
      navigate(-1); // Refresh the table
    } catch (err) {
      console.error("Error disbanding team:", err.message);
      alert("Failed to disband the team.");
    }
  };
  

  return (
    <div className="invite-team-container">
      {/* Header Section */}
      <div className="invite-header-container">
      <button className="invite-team-back-button-container" onClick={() => navigate(-1)}>
          <BackButton />
        </button>
        <h2>Invite a Team Member</h2>
      </div>
  
        {isInviter && !isTeamFull && ( // Only show invite form if the user is the inviter and the team is not full
          <div className="invite-team-form-container">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              disabled={!canInvite || isTeamFull}
              placeholder="Enter email to invite"
            />
            <button onClick={handleInvite} disabled={!canInvite || isTeamFull}>
              Send Invitation
            </button>
          </div>
        )}
  
      {/* Pending Invites Section (For Invited User) */}
      {!isInviter && pendingInvites.length > 0 && !isTeamFull && (
        <div>
          <h2>Pending Invites</h2>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingInvites.map((invite) => (
                <tr key={invite.invite}>
                  <td>{invite.invite}</td>
                  <td>{invite.approved ? "Approved" : "Pending"}</td>
                  <td>
                    <button onClick={() => handleApprovalChange(invite.invite, true)}>Approve</button>
                    <button onClick={() => handleApprovalChange(invite.invite, false)}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
  
      {/* Team Members Section */}
      <div>
        {teamData.length === 0 && <p>No team members yet.</p>}
        {teamData.length > 0 && (
          <div className="invite-team-table-container">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teamData.map((member) => (
                  <tr key={member.invite}>
                    <td>{member.invite}</td>
                    <td>{member.approved ? "Approved" : "Pending"}</td>
                    <td>
                      {/* Show "Remove" button if the current user is the inviter */}
                      {isInviter && member.invite !== currentUserEmail && (
                        <button onClick={() => handleRemoveAccount(member.invite)}>Remove</button>
                      )}
                      {/* Show "Leave Team" or "Disband Team" depending on current user's status */}
                      {member.invite === currentUserEmail && !isInviter && (
                        <button onClick={handleLeaveTeam}>Leave Team</button>
                      )}
                      {isInviter && member.invite === currentUserEmail && isApproved && (
                        <button onClick={handleDisbandTeam}>Disband Team</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default InviteTeam;