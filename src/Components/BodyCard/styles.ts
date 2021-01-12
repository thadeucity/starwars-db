import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 32px;

  background: ${props => props.theme.colors.primary};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 16px;
`;

export default Container;
