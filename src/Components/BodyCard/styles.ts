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

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  @media (max-width: 520px) {
    padding: 16px;
  }
`;

export default Container;
