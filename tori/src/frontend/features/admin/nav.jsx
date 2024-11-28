import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaBox, FaHistory, FaUser, FaUsers } from 'react-icons/fa'; // Additional Admin icon

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #2E2D2D; /* Dark background */
  color: white;
  padding: 0.7rem 0rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #676D75;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &.active {
    color: white;  // Active link color
    font-weight: bold;
  }
`;

const NavIcon = styled.div`
  font-size: 1.5rem;
  color: #676D75;
  margin-bottom: 0.3rem;

  ${NavLink}.active & {
    color: white;
  }
`;

function AdminNav() {
  const location = useLocation(); // Get current route

  return (
    <NavWrapper>
      <NavLink to="/admin/admin_home" className={location.pathname === '/admin/admin_home' ? 'active' : ''}>
        <NavIcon>
          <FaHome />
        </NavIcon>
        Dashboard
      </NavLink>
      <NavLink to="/admin/admin_inventory" className={location.pathname === '/admin/admin_inventory' ? 'active' : ''}>
        <NavIcon>
          <FaBox />
        </NavIcon>
        Inventory
      </NavLink>
      <NavLink to="/admin/admin_history" className={location.pathname === '/admin/admin_history' ? 'active' : ''}>
        <NavIcon>
          <FaHistory />
        </NavIcon>
        History
      </NavLink>
      <NavLink to="/admin/admin_profile" className={location.pathname === '/admin/admin_profile' ? 'active' : ''}>
        <NavIcon>
          <FaUser />
        </NavIcon>
        Profile
      </NavLink>
      <NavLink to="/admin/manage-users" className={location.pathname === '/admin/manage-users' ? 'active' : ''}>
        <NavIcon>
          <FaUsers />
        </NavIcon>
        Manage Users
      </NavLink>
    </NavWrapper>
  );
}

export default AdminNav;
