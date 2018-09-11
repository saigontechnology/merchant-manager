import React from 'react';
import MuiCheckbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

/**
 * A Material UI Checkbox
 */
const Checkbox = ({
  className,
  isChecked = false,
  onChange,
  color,
  style,
  ...props
}) => {
  return (
    <MuiCheckbox
      checked={isChecked}
      onChange={onChange}
      color={color}
      {...props}
    />
  );
};

Checkbox.propTypes = {
  /**
   * If true, the component is checked.
   */
  isChecked: PropTypes.bool,
  /**
   * Callback fired when the state is changed.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * The color of the component
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'default'])
};
export default Checkbox;
