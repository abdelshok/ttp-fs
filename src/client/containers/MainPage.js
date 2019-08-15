// MAIN PAGE Container
// - Main page for user, shown after successful authentication.
// - Page contains basic information about the user and the two main uses of the app,
// either giving a list of past Transactions or looking at the current stocks held

// Packages
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Internal Modules
import BuyStockComponent from '../components/BuyStockComponent';
import MainPageUserInfoComponent from '../components/MainPageUserInfoComponent';
import StockContainer from '../containers/StockContainer';
import TransactionContainer from '../containers/TransactionContainer';

class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let mainPage;
        // Depending on the mainPageType in the store, the container
        // will either show the transaction or the stock components 
        if (this.props.mainPageType == "transactions") {
            mainPage = <TransactionContainer />
        } else if (this.props.mainPageType == "stocks") {
            mainPage = <StockContainer />
        }

        // MainPageUserInfoComponent contains basic user data & MainPage
        // either contains Stock or Transaction Data
        return ( 
        <div>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <MainPageUserInfoComponent />
                {mainPage}
            </Grid>
            <Grid item xs={12} sm={6}>
                <BuyStockComponent />
            </Grid>
        </Grid>
        </div>          
        )
    }
}

// Typechecking for the MainPage props
MainPage.propTypes = {
	mainPageType: PropTypes.string
};

// Sets the defaultProps of the MainPage to empty arrays
MainPage.defaultProps = {
	stocksArray: "stocks"
};

// Maps the store's properties to the above component's props in order 
// to re-render the MainPage with the proper stock list
function mapStateToProps(state) {
	return {
			mainPageType: state.mainPageType
	};
}


export default connect(mapStateToProps)(MainPage);
