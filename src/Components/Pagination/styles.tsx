import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core';

import theme from '../../styles/theme';

const Container = styled.div`
  width: 100%;
  margin-top: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Container;

export const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: theme.colors.text,
    },
    text: {
      primary: theme.colors.text,
    },
  },
});
