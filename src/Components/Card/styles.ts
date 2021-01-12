import styled, { css } from 'styled-components';

interface ContainerProps {
  isLoading?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;

  background: ${props => props.theme.colors.primaryLight};

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 16px;
  overflow: hidden;

  cursor: pointer;

  ${props =>
    props.isLoading
      ? css`
          div,
          span {
            visibility: hidden;
          }

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
                ${props.theme.colors.primaryBright} 50%,
                transparent 90%
              )
            `};
            animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `
      : ''}
`;

export const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 100%;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    object-fit: cover;
    border-radius: 2px;
  }

  div {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

export const CardTitle = styled.span`
  padding: 12px 8px;
  font-weight: 500;
`;
