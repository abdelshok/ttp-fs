// MAIN PAGE USER INFO COMPONENT
// Div that will hold the two main headers shown on the main page
// including the user's name and the portfolio amount
// - Used in the Mainpage container

// Packages
import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// App Components
import MainPageNormalDiv from '../styledComponents/MainPageNormalDiv';
import MainPageNormalText from '../styledComponents/MainPageNormalText';
import FullstackTheme from '../styledComponents/FullstackTheme';

const BoldTitleText = styled(MainPageNormalText)`
    font-weight: bold;
    font-size: 26px;
    text-align: left;
    padding-left: 20px;
    width: auto;
`;


class MainPageUserInfoComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        const { portfolioAmount, userFullName } = this.props;

        return (
            <MainPageNormalDiv>
                <BoldTitleText FullstackTheme={FullstackTheme}> 
                    {userFullName}
                </BoldTitleText>
                <MainPageNormalText FullstackTheme={FullstackTheme}> 
                    Portfolio: $
                    {portfolioAmount}
                </MainPageNormalText>
            </MainPageNormalDiv>
        );
    }
}

MainPageUserInfoComponent.propTypes = {
    userFullName: PropTypes.string,
    portfolioAmount: PropTypes.number
};

MainPageUserInfoComponent.defaultProps = {
    userFullName: 'F. Scott Fitzgerald',
    portfolioAmount: 5000
};


function mapStateToProps(state) {
    return {
        userFullName: state.userFullName,
        portfolioAmount: state.portfolioAmount
    };
}

export default connect(mapStateToProps)(MainPageUserInfoComponent);
