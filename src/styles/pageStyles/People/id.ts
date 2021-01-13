import styled, { css } from 'styled-components';
import { loadingAnimation } from '../baseStyling';

interface ImageContainerProps {
  isLoading?: boolean;
}

export const GoBack = styled.div`
  width: 100%;

  margin-top: -12px;
  margin-bottom: 12px;

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.text};

    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  svg {
    margin-right: 4px;
  }
`;

export const CharacterData = styled.div`
  width: 100%;
  flex: 1;

  display: grid;
  grid-template-columns: 3fr 5fr;

  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const CharacterImageContainer = styled.div<ImageContainerProps>`
  width: 100%;
  position: relative;
  padding-top: 140%;

  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    object-fit: cover;
  }

  div {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @media (max-width: 680px) {
    width: 400px;
    height: 525px;
    padding-top: 0;
    margin: 0 auto;
  }

  @media (max-width: 520px) {
    width: 300px;
    height: 400px;
  }

  @media (max-width: 360px) {
    width: 250px;
    height: 330px;
  }

  ${props =>
    props.isLoading
      ? css`
          background: ${props.theme.colors.primaryLight};
          ${loadingAnimation}
        `
      : ''}
`;

export const CharacterInfo = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;

    svg {
      margin-bottom: 4px;
      color: ${props => props.theme.colors.softText};
      width: 20px;
      height: 20px;
    }

    h1 {
      font-size: 24px;
      margin-left: 8px;
    }

    span {
      margin-left: 8px;
      margin-bottom: 1px;
      font-size: 20px;
      font-weight: 300;
      color: ${props => props.theme.colors.softText};
    }

    & + li {
      margin-top: 16px;
    }

    @media (max-width: 520px) {
      svg {
        width: 18px;
        height: 18px;
      }
      h1 {
        font-size: 20px;
      }
      span {
        font-size: 18px;
        font-weight: 400;
      }
    }
  }

  .loading-text {
    position: relative;
    overflow: hidden;
    background-color: ${props => props.theme.colors.primaryLight};
    height: 28px;
    width: 250px;
    border-radius: 2px;

    ${loadingAnimation}

    & + .loading-text {
      margin-top: 16px;
    }
  }
`;
