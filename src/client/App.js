// Packages
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Internal Modules
import NavigationBarComponent from './components/NavigationBarComponent';
import AppComponentWrapper from './styledComponents/AppComponentWrapper';
import FooterComponent from './components/FooterComponent';
import Routes from './Routes';
import MainPage from './containers/MainPage';
import store from './store/store';

// Styling
import './app.css';
import FullstackTheme from './styledComponents/FullstackTheme';

// Assets

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Empty
    };
  }

  render() {
    const authenticationStatus = store.getState().isAuthenticated;
    console.log('Authentication status new is ', authenticationStatus);

    if (authenticationStatus === true) {
        return (
          <AppComponentWrapper FullstackTheme={FullstackTheme}>
            <div>
              <NavigationBarComponent />
              <MainPage />
              <FooterComponent />
            </div>
          </AppComponentWrapper>
        );
    }
    return (
      <AppComponentWrapper FullstackTheme={FullstackTheme}>
        <div>
          <NavigationBarComponent />
          <Routes />
          <FooterComponent />
        </div>
      </AppComponentWrapper>
    ); 
  }
}


function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
  };
}

export default withRouter(App);
