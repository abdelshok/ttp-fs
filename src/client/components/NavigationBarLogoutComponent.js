// Navigation Bar Logout Component
// Component that wraps the logout button and contains the functionality it needs
// such as clearing the redux state of the user's information and redirecting the 
// user to the login page

// Packages
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';

// App Components
import store from '../store/store';
import { 
  authenticateUser, setEmail, setPassword, setStocksLogin, setTransactionsLogin, setFullName, setPortfolioAmount, setUserId
} from '../action-creators/actions';
import NavigationBarIconTextContainer from '../styledComponents/NavigationBarIconTextContainer';
import NavigationBarTextLink from '../styledComponents/NavigationBarTextLink';
import FullstackTheme from '../styledComponents/FullstackTheme';

// Inline-block styled here in order to ensure that the element's width is correctly
// visualized
const LogoutContainer = styled(NavigationBarIconTextContainer)`
    width: 120px;
`;

class NavigationBarLogoutComponent extends Component {

  constructor(props) {
      super(props);

      this.state = {
          isAuthenticated: null,
      }
  }

  // Dispatches all the necessary actions to the redux reducer in order 
  // to clear the state of vital data
  handleLogout = (event) => {
    event.preventDefault();

    store.dispatch(authenticateUser(false));
    store.dispatch(setEmail(''));
    store.dispatch(setPassword(''));
    store.dispatch(setStocksLogin([]));
    store.dispatch(setTransactionsLogin([]));
    store.dispatch(setFullName(''));
    store.dispatch(setPortfolioAmount(0));
    store.dispatch(setUserId(''));

    console.log('Handle logout function is called');
    console.log('New authentication status after the logouthandler is called', store.getState().isAuthenticated);

    // Set state isAuthenticated to false to cause a component re-rendering, 
    // in order to bring us to the login page.
    this.setState({
        isAuthenticated: false,
    });
  };

  // Method used to redirect us to the /login page when the user logs out
  renderRedirect = () => {
    console.log('Redirect called when the logout button is clicked');
    if (store.getState().isAuthenticated === false) {
        console.log('State of isAuthenticated is false. Should be redirected soon.');
        return <Redirect to="/login" />;
    }
  }

  render() {
    return (
      <LogoutContainer FullstackTheme={FullstackTheme}>
        {this.renderRedirect()}
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
