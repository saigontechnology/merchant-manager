import React from 'react';
import MuiButton from '@material-ui/core/Button';

export function Button({ children, ...props }) {
  return (
    <MuiButton variant="outlined" color="primary" {...props}>
      {children}
    </MuiButton>
  );
}
