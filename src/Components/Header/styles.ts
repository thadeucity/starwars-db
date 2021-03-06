import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 40px 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 300px;
  }

  @media (max-width: 520px) {
    img {
      max-width: 240px;
    }
  }
`;

export default Container;
