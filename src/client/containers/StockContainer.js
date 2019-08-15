// Stock Container 
// React container which will hold and display all of the user's retrieved stocks from the 
// AWS DynamoDB database

// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Internal modules 
import StockPortfolioContainer from '../styledComponents/StockPortfolioContainer';
import FullstackTheme from '../styledComponents/FullstackTheme';
import store from '../store/store';

class StockContainer extends Component {
    constructor(props, context) {
				super(props, context);
    }

    render() {
			console.log('Stock container props are', this.props);
			return (
				<StockPortfolioContainer FullstackTheme={FullstackTheme} >
					<p> STOCK 1 </p>
				</StockPortfolioContainer>
			);
    };
};

// Typechecking for the stockContainer props
StockContainer.propTypes = {
	stocksArray: PropTypes.array,
	transactionsArray: PropTypes.array
};

// Sets the defaultProps of the stockContainer to empty arrays
StockContainer.defaultProps = {
	stocksArray: [],
	transactionsArray: []
};

// Maps the store's properties to the above component's props in order 
// to re-render the stockContainer with the proper stock list
function mapStateToProps(state) {
	return {
			stocksArray: state.stocksArray,
			transactionsArray: state.transactionsArray
	};
}

export default connect(mapStateToProps)(StockContainer);
