import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 8px 16px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  background: #000;

  font-size: 14px;

  svg {
    margin: 0 8px;
  }

  a {
    color: ${props => props.theme.colors.text};
    margin-left: 8px;
  }
`;

export default Container;
