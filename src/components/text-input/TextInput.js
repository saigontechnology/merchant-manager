import React from 'react';
import MuiTextField from '@material-ui/core/TextField';

/** @component
 * Material UI TextField
 */
export function TextInput(props) {
  return (
    <MuiTextField style={{ width: '100%', marginTop: '1rem' }} {...props} />
  );
}
