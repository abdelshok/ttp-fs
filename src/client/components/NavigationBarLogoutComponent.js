// Packages
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';

// App Components
import store from '../store/store';
import { authenticateUser, setEmail, setPassword } from '../action-creators/actions';
import TextContainer from '../styledComponents/NavigationBarIconTextContainer';
import NavigationBarTextLink from '../styledComponents/NavigationBarTextLink';
import NavigationBarLinkLogo from '../styledComponents/NavigationBarLinkLogo';
import FullstackTheme from '../styledComponents/FullstackTheme';

const LogoutContainer = styled(TextContainer)`
    position: absolute;
    bottom: 15px;
    margin-left: 90%;
`;

const PowerIcon = require('../assets/icons/powerIcon.svg');

class NavigationBarLogoutComponent extends Component {

  constructor(props) {
      super(props);

      this.state = {
          isAuthenticated: null,
      }
  }

// Do you need to declare a constructor?
  handleLogout = (event) => {
    event.preventDefault();

    // Clears the state
    store.dispatch(authenticateUser(false));
    store.dispatch(setEmail(''));
    store.dispatch(setPassword(''));

    console.log('Handle logout function is called');
    console.log('New authentication status after the logouthandler is called', store.getState().isAuthenticated);

    // Set state used here to cause a component re-rendering, in order to bring
    // us to the login page.
    this.setState({
        isAuthenticated: false,
    });
  };

  renderRedirect = () => {
    console.log('Redirect called when the logout button is clicked');
    if (store.getState().isAuthenticated === false) {
        console.log('State of isAuthenticated is false. Should be redirected by now.');
        return <Redirect to="/login" />;
    }
  }

  render() {
    return (
      <LogoutContainer FullstackTheme={FullstackTheme}>
        {this.renderRedirect()}
        <NavigationBarLinkLogo src={PowerIcon} />
        <Link to="login">
            <NavigationBarTextLink
            onClick={this.handleLogout}
            FullstackTheme={FullstackTheme}
            >
            {' '}
            LOGOUT
            {' '}
            </NavigationBarTextLink>
        </Link>
      </LogoutContainer>
    );
  }
}

export default NavigationBarLogoutComponent;
