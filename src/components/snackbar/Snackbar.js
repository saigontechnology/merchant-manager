import React from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';

/**
 * Material UI Snackbar
 * @component
 */
export class Snackbar extends React.PureComponent {
  static defaultProps = {
    name: 'app'
  };

  static propTypes = {
    /**
     * A unique name
     */
    name: PropTypes.string
  };

  static instances = {};

  static show({ name = 'app', ...params }) {
    const instance = Snackbar.instances[name];
    if (instance) {
      Snackbar.instances[name].show(params);
    } else {
      console.warn(
        `[${
          Snackbar.name
        }.show()] instance with name '${name}' not found. Should be one of [${Object.keys(
          Snackbar.instances
        ).join(', ')}]`
      );
    }
  }

  static hide(name) {
    if (name) {
      Snackbar.instances[name].hide();
    } else {
      Object.values(Snackbar.instances).map(
        instance => instance.hide && instance.hide()
      );
    }
  }

  constructor(props) {
    super(props);

    if (props.name) {
      Snackbar.instances[props.name] = this;
    }

    this.state = { open: false };
  }
  componentWillUnmount() {
    delete Snackbar.instances[this.props.name];
  }
  show = ({
    vertical = 'bottom',
    horizontal = 'center',
    open = true,
    message = '',
    autoHideDuration = 4000
  }) => {
    this.setState({ vertical, horizontal, open, message, autoHideDuration });
  };
  hide = () => {
    this.setState({ open: false });
  };
  render() {
    const {
      open,
      vertical,
      horizontal,
      message,
      autoHideDuration
    } = this.state;
    return (
      <MuiSnackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={this.hide}
        message={message}
      />
    );
  }
}
