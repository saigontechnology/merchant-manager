import './rxjsImports';
import React, { Component } from 'react';
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ConnectedRouter } from 'connected-react-router';
import routerHistory from './redux/routerHistory.js';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { TopProgressBar } from './components/top-progress-bar';
import { Loader } from './components/loader';
import { Snackbar } from './components/snackbar';
import './global.css';
import renderIf from './helpers/renderIf';
import fetchHelper from './helpers/fetchHelper';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { HOME_PAGE } from './constant';

export class App extends Component {
  state = { isShowApp: false };
  componentDidMount() {
    this.setupFetchHelper();

    if (this.props.location.pathname === '/') {
      this.props.dispatch(push(HOME_PAGE));
    }

    Loader.hide();
    this.setState({ isShowApp: true });
  }
  setupFetchHelper = () => {
    fetchHelper.addBeforeRequestInterceptor(() => {
      TopProgressBar.show();
    });
    fetchHelper.addAfterResonseInterceptor(() => {
      TopProgressBar.hide();
    });
  };
  render() {
    const { isShowApp } = this.state;
    return (
      <Wrapper>
        <TopProgressBar />

        {renderIf(isShowApp)(
          <AppRouteWrapper id="app-wrapper">
            <AppRoutes />
          </AppRouteWrapper>
        )}

        <Loader isShow={true} />
        <Snackbar />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const AppRouteWrapper = styled.div`
  overflow: auto;
`;

App = withRouter(connect()(App));

const ConnectedApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default ConnectedApp;
