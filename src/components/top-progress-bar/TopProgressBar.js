import React from 'react';
import 'react-progress-2/main.css';
import Progress from 'react-progress-2';
import styled from 'styled-components';

/**
 * A wrapper of react-progress-2, which is a YouTube style progress bar for ReactJS.
 * See more: https://github.com/milworm/react-progress-2
 */
class TopProgressBar extends React.Component {
  static show() {
    Progress.show();
  }
  static hide() {
    Progress.hide();
  }
  render() {
    return (
      <Wrapper>
        <Progress.Component />
      </Wrapper>
    );
  }
}
export { TopProgressBar };

const Wrapper = styled.div`
  height: 0.125rem;
  .loader-60devs {
    z-index: 10051;
  }
  .loader-60devs .loader-60devs-progress {
    height: 0.125rem;
    width: 100%;
    background-color: red;
  }
  /* comment below if you want react-progress-2 to block UI */
  .loader-60devs::before {
    display: none;
  }
`;
