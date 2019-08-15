// Navigation Bar Component
// Component representing the Navigation Bar, which contains the company logo,
// the Transaction / Stocks buttons that toggle between both lists, and the logout
// button
// - Functionality in this component is limited to switching the store's mainPage state
// in order to toggle between the transactions and the stocks
// All other functionality is contained within this component's component: Logout component, etc.
// This ensures that they are all "self-contained";

// Packages
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// App Components 
import NavigationBarBlock from '../styledComponents/NavigationBarBlock';
import FullstackTheme from '../styledComponents/FullstackTheme';
import NavigationBarTextLink from '../styledComponents/NavigationBarTextLink';
import NavigationBarLogoutComponent from './NavigationBarLogoutComponent';
import { setMainPage } from '../action-creators/actions';
import store from '../store/store';
// Import container of logo
import CompanyLogo from '../styledComponents/CompanyLogo';
// Assets
const CompanyLogoLink = require('../assets/website_logo_2.png');


class NavigationBarComponent extends Component {
    constructor(props) {
        super(props);
        // State properties are local to component and are used to render
        // the logged in Navigation bar look or the logged out navigation 
        // bar look
        this.state = {
            unauthenticatedPage: 'login',
            authenticatedPage: 'main',
        };

    }

    // Sends to the store what page: 'stocks' or 'transactions' the user wants to see
    handlePageRequest = () => {
        store.dispatch(setMainPage(event.target.id));    
    }

    render() {
        console.log('User is authenticated from Navigation Bar Component');
        const authenticationStatus = store.getState().isAuthenticated;
        console.log('Authentication status', authenticationStatus);
        let linkAddress;

        if (authenticationStatus === true) {
            linkAddress = this.state.authenticatedPage;
        } else {
            linkAddress = this.state.unauthenticatedPage;
        }

        console.log('In NavBarComponent, linkAdress ', linkAddress);
        return (
            <NavigationBarBlock FullstackTheme={FullstackTheme}>
                <Link to={linkAddress}>
                    <CompanyLogo src={CompanyLogoLink} />
                </Link>

                { authenticationStatus === true &&
                    <div>
                    <NavigationBarTextLink 
                    onClick={this.handlePageRequest}
                    FullstackTheme={FullstackTheme}
                    id="transactions"
                    >
                     Transactions 
                    </NavigationBarTextLink>
                    <NavigationBarTextLink 
                    onClick={this.handlePageRequest}
                    FullstackTheme={FullstackTheme}
                    id="stocks">
                     Stocks 
                    </NavigationBarTextLink>
                    </div>
                }

                { authenticationStatus === true &&
                        <NavigationBarLogoutComponent />
                }

            </NavigationBarBlock>
        );
    }
}

export default NavigationBarComponent;
