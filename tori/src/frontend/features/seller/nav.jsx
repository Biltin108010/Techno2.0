import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    color: #aaa;
  }
`;

function Nav() {
  return (
    <NavWrapper>
      <NavLink to="/seller/home">Home</NavLink>
      <NavLink to="/seller/inventory">Inventory</NavLink>
      <NavLink to="/seller/history">History</NavLink>
      <NavLink to="/seller/profile">Profile</NavLink>
    </NavWrapper>
  );
}

export default Nav;
