import React from 'react';
import styled from 'styled-components';

/**
 * Layout that used in most of the pages
 */
export const Layout = props => {
  return <Wrapper {...props} />;
};

const Wrapper = styled.div`
  width: 1284px;
  margin: auto;
`;
