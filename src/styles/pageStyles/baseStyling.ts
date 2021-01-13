import styled, { css } from 'styled-components';
import theme from '../theme';

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

  @media (max-width: 680px) {
    width: auto;
  }

  @media (max-width: 520px) {
    padding: 8px;
  }
`;

export const loadingAnimation = css`
  @keyframes load {
    from {
      left: -500px;
    }
    to {
      left: 100%;
    }
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -500px;
    top: 0;
    height: 100%;
    width: 500px;
    background: ${`
      linear-gradient(
        to right,
        transparent 10%,
        ${theme.colors.primaryBright} 50%,
        transparent 90%
      )
    `};
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;
