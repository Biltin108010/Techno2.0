import React, { useState, useEffect } from "react";
import supabase from "../../../backend/supabaseClient"; // Import your Supabase client
import { useNavigate } from "react-router-dom"; // For navigating between pages

function InviteTeam() {
  const [emailInput, setEmailInput] = useState(""); // Input field for inviting email
  const [teamData, setTeamData] = useState([]); // Data for team members
  const [pendingInvites, setPendingInvites] = useState([]); // Pending invites
  const [loading, setLoading] = useState(true); // Loading state
  const [isAlreadyInvited, setIsAlreadyInvited] = useState(false); // Track if current user is already invited
  const navigate = useNavigate(); // Navigate hook
  const [currentUserEmail, setCurrentUserEmail] = useState(""); // Current user's email
  const [currentTeamNum, setCurrentTeamNum] = useState(null); // Current user's team number

  // Fetch team data
  const fetchTeamData = async () => {
    try {
      setLoading(true);

      // Fetch current user's team number
      const { data: teamInfo, error: teamError } = await supabase
        .from("team")
        .select("team_num")
        .eq("invite", currentUserEmail)
        .single();

      if (teamError && teamError.code !== "PGRST100") throw teamError;

      const teamNum = teamInfo?.team_num || currentTeamNum;
      setCurrentTeamNum(teamNum);

      // Fetch team data and join with users table manually
      const { data: teamData, error: teamDataError } = await supabase
        .from("team")
        .select("invite, approved")
        .eq("team_num", teamNum);

      if (teamDataError) throw teamDataError;

      // Fetch user roles for each invite
      const invites = teamData.map((teamMember) => teamMember.invite);
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("email, role")
        .in("email", invites);

      if (usersError) throw usersError;

      // Merge the data
      const mergedData = teamData.map((teamMember) => {
        const user = usersData.find((user) => user.email === teamMember.invite);
        return {
          ...teamMember,
          role: user?.role || "No role assigned",
        };
      });

      // Set the merged data (both approved and pending invites)
      setTeamData(mergedData);

      // Separate pending invites from approved ones
      const pending = mergedData.filter((member) => !member.approved);
      setPendingInvites(pending);

      // Check if the current user is already invited
      const userAlreadyInvited = mergedData.some((member) => member.invite === currentUserEmail);
      setIsAlreadyInvited(userAlreadyInvited);
    } catch (err) {
      console.error("Error fetching team data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;

        setCurrentUserEmail(user.email);
        fetchTeamData();
      } catch (err) {
        console.error("Error fetching current user:", err.message);
      }
    };

    fetchCurrentUser();
  }, [currentUserEmail]);

  // Handle invite submission
  const handleInvite = async () => {
    if (!emailInput.trim()) {
      alert("Please enter a valid email.");
      return;
    }

    if (emailInput === currentUserEmail) {
      alert("You cannot invite yourself!");
      return;
    }

    try {
      // Check if inviter exists in the team table
      const { data: inviter, error: inviterError } = await supabase
        .from("team")
        .select("team_num")
        .eq("invite", currentUserEmail)
        .eq("approved", true)
        .single();

      let teamNum = currentTeamNum;

      if (!inviter) {
        // Generate a new team number if none exists
        const { data: maxTeamNumData, error: maxTeamNumError } = await supabase
          .from("team")
          .select("team_num")
          .order("team_num", { ascending: false })
          .limit(1)
          .single();

        if (maxTeamNumError) throw maxTeamNumError;

        const newTeamNum = (maxTeamNumData?.team_num || 0) + 1;

        // Add current user to the team table as the first member
        const { data: newTeam, error: newTeamError } = await supabase
          .from("team")
          .insert([{ invite: currentUserEmail, approved: true, team_num: newTeamNum }])
          .select()
          .single();

        if (newTeamError) throw newTeamError;

        teamNum = newTeamNum;
        setCurrentTeamNum(teamNum);
      }

      // Check if the invite already exists
      const { data: duplicateInvite, error: duplicateError } = await supabase
        .from("team")
        .select("*")
        .eq("invite", emailInput.trim())
        .eq("team_num", teamNum);

      if (duplicateError) throw duplicateError;

      if (duplicateInvite.length > 0) {
        alert("This person has already been invited.");
        return;
      }

      // Insert the new invite
      const { error } = await supabase
        .from("team")
        .insert([{ invite: emailInput.trim(), approved: false, team_num: teamNum }]);

      if (error) throw error;

      alert("Invite sent successfully!");
      setEmailInput(""); // Reset input field
      fetchTeamData(); // Refresh team data
    } catch (err) {
      console.error("Error sending invite:", err.message);
      alert("Failed to send invite.");
    }
  };

  // Handle approval status change
  const handleApprovalChange = async (invite, value) => {
    try {
      const { error } = await supabase
        .from("team")
        .update({ approved: value })
        .eq("invite", invite)
        .eq("team_num", currentTeamNum);

      if (error) throw error;

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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="invite-team-container">
      <h1>Invite Team</h1>

      {/* Conditionally render invite input based on user invite status */}
      {!isAlreadyInvited && (
        <div className="invite-input">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter email to invite"
          />
          <button className="invite-button" onClick={handleInvite}>
            Send Invite
          </button>
        </div>
      )}

      {/* Display Pending Invites Table if there are pending invites */}
      {pendingInvites.length > 0 && (
        <div className="pending-invite-table">
          <h2>Pending Invites</h2>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {pendingInvites.map((invite) => (
                <tr key={invite.invite}>
                  <td>{invite.invite}</td>
                  <td>
                    <button onClick={() => handleApprovalChange(invite.invite, true)}>
                      ✅
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleApprovalChange(invite.invite, false)}>
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Team Members Table (if there are approved members) */}
      {teamData.length > 0 && (
        <div className="team-table">
          <h2>Team Members</h2>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {teamData.filter((member) => member.approved).map((invite) => (
                <tr key={invite.invite}>
                  <td>{invite.invite}</td>
                  <td>{invite.approved ? "Accepted" : "Pending"}</td>
                  <td>
                    <button onClick={() => handleRemoveAccount(invite.invite)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt; Back
        </button>
      </div>
    </div>
  );
}

export default InviteTeam;
