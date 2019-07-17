// Packages
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// App Components 
import NavigationBarBlock from '../styledComponents/NavigationBarBlock';
import FullstackTheme from '../styledComponents/FullstackTheme';
import NavigationBarLogoutComponent from './NavigationBarLogoutComponent';
import store from '../store/store';
// import container of logo
import CompanyLogo from '../styledComponents/CompanyLogo';
// Assets
const CompanyLogoLink = require('../assets/website_logo_2.png');


class NavigationBarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unauthenticatedPage: 'login',
            authenticatedPage: 'main'
        };
        // State properties used only in this component for navigation between links
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
                        <NavigationBarLogoutComponent />
                }
            </NavigationBarBlock>
        );
    }
}

export default NavigationBarComponent;
