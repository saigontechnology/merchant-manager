import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

/**
 * @component
 * A loader. Put this in the end of a relative position element, it then blocks that element.
 */
export class Loader extends React.PureComponent {
  static defaultProps = {
    isShow: true,
    name: 'app'
  };
  static instances = {};
  /**
   * Show the loader specified by `name`
   * @param {*} name
   */
  static show(name = 'app') {
    const instance = Loader.instances[name];
    if (instance) {
      Loader.instances[name].show();
    } else {
      console.warn(
        `[${
          Loader.name
        }.show()] instance with name '${name}' not found. Should be one of [${Object.keys(
          Loader.instances
        ).join(', ')}]`
      );
    }
  }
  /**
   * Hide the loader specified by `name`, if `name` is not defined, hide all loaders.
   * @param {*} name
   */
  static hide(name) {
    if (name) {
      Loader.instances[name].hide();
    } else {
      Object.values(Loader.instances).map(
        instance => instance.hide && instance.hide()
      );
    }
  }
  show = () => {
    this.setState({ isShow: true });
  };
  hide = () => {
    this.setState({ isShow: false });
  };
  constructor(props) {
    super(props);
    if (props.name) {
      if (Loader.instances[props.name])
        console.warn(
          `[${Loader.name}.constructor()] A Loader with prop name='${
            props.name
          }' already exists`
        );
      Loader.instances[props.name] = this;
    }

    this.state = {
      isShow: props.isShow
    };
  }
  componentWillUnmount() {
    delete Loader.instances[this.props.name];
  }
  render() {
    const { isShow } = this.state;
    return isShow ? (
      <Wrapper>
        <CircularProgress classes={{ colorPrimary: 'colorPrimary' }} />
      </Wrapper>
    ) : null;
  }
}
Loader.propTypes = {
  /**
   * Indicate to show the loading or not by default
   */
  isShow: PropTypes.bool,
  /**
   * A unique name
   */
  name: PropTypes.string
};
const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .colorPrimary {
    color: #2196f3;
  }
`;
