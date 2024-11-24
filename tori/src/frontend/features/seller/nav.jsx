import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaBox, FaHistory, FaUser } from 'react-icons/fa'; // For icons

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #222;  // Dark background
  color: white;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  transition: all 0.3s ease;
  &:hover {
    color: #aaa;
  }
  &.active {
    color: #3498db;  // Active link color
    font-weight: bold;
  }
`;

const NavIcon = styled.div`
  font-size: 1.5rem;  // Icon size
  margin-bottom: 0.3rem;
`;

function Nav() {
  return (
    <NavWrapper>
      <NavLink to="/seller/home" activeClassName="active">
        <NavIcon>
          <FaHome />
        </NavIcon>
        Home
      </NavLink>
      <NavLink to="/seller/inventory" activeClassName="active">
        <NavIcon>
          <FaBox />
        </NavIcon>
        Inventory
      </NavLink>
      <NavLink to="/seller/history" activeClassName="active">
        <NavIcon>
          <FaHistory />
        </NavIcon>
        History
      </NavLink>
      <NavLink to="/seller/profile" activeClassName="active">
        <NavIcon>
          <FaUser />
        </NavIcon>
        Profile
      </NavLink>
    </NavWrapper>
  );
}

export default Nav;
