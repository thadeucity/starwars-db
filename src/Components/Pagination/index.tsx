import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { Pagination as MaterialUIPagination } from '@material-ui/lab';

import Container, { materialTheme } from './styles';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  handlePageChange: (value: number) => void;
}

const Pagination = ({
  pageCount,
  currentPage,
  handlePageChange,
}: PaginationProps): React.ReactElement => {
  return (
    <MuiThemeProvider theme={materialTheme}>
      <Container>
        <MaterialUIPagination
          count={pageCount}
          page={currentPage}
          onChange={(_, value) => handlePageChange(value)}
          shape="rounded"
          variant="outlined"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
      </Container>
    </MuiThemeProvider>
  );
};

export default Pagination;
