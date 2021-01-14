import styled, { css } from 'styled-components';
import { loadingAnimation } from '../../styles/pageStyles/baseStyling';

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

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }

  ${props =>
    props.isLoading
      ? css`
          div,
          span {
            visibility: hidden;
          }

          ${loadingAnimation}
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
