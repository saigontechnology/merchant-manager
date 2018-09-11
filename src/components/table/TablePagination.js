import React from 'react';
import MuiTablePagination from '@material-ui/core/TablePagination';

export const TablePagination = ({
  count,
  rowsPerPage,
  page,
  onChangePage,
  onChangeRowsPerPage
}) => (
  <MuiTablePagination
    component="div"
    count={count}
    rowsPerPage={rowsPerPage}
    page={page}
    backIconButtonProps={{
      'aria-label': 'Previous Page'
    }}
    nextIconButtonProps={{
      'aria-label': 'Next Page'
    }}
    onChangePage={onChangePage}
    onChangeRowsPerPage={onChangeRowsPerPage}
  />
);
