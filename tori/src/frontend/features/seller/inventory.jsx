import styled from 'styled-components';

const ComingSoon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
  color: #333;
`;

function Inventory() {
  return <ComingSoon>Coming Soon</ComingSoon>;
}

export default Inventory;
