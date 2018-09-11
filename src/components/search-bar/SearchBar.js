import React from 'react';
import styled from 'styled-components';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

export function SearchBar({ onChange }) {
  return (
    <Wrapper>
      <TextField
        onChange={onChange}
        onFocus={e => e.target.select()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: inline-block;
  padding-left: 1rem;
`;
