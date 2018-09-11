import React from 'react';
import Checkbox from './Checkbox';
import styled from 'styled-components';
import noop from '../../helpers/noop';
import PropTypes from 'prop-types';

/**
 * Material UI checkbox with a label
 */
export function CheckboxInput({ isChecked = false, onChange = noop, label }) {
  return (
    <Label>
      <Checkbox isChecked={isChecked} onChange={onChange} />
      <span>{label}</span>
    </Label>
  );
}

CheckboxInput.propTypes = {
  isChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

const Label = styled.label`
  display: block;
  cursor: pointer;
  user-select: none;
`;
