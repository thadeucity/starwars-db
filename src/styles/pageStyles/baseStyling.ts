import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  min-height: 100vh;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: flex-start;
`;

export const Content = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1280px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
