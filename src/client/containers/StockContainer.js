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
import PortfolioText from '../styledComponents/PortfolioText';

class StockContainer extends Component {
    constructor(props, context) {
				super(props, context);
    }

    render() {
			// Creates a JSX list of all the different Stock components
			const stockList = this.props.stocksArray.map((stock, index) => {
				return (
						<PortfolioText FullstackTheme={FullstackTheme} stock={stock} key={index}> 
							<div> {stock.companyName} x {stock.quantity} </div>
							<div> ${Math.floor(stock.currentPrice * stock.quantity)} </div>
						</PortfolioText>
				);
			});

			return (
				<StockPortfolioContainer FullstackTheme={FullstackTheme} >
						{stockList}
				</StockPortfolioContainer>
			);
    };
};

// Typechecking for the stockContainer props
StockContainer.propTypes = {
	stocksArray: PropTypes.array
};

// Sets the defaultProps of the stockContainer to empty arrays
StockContainer.defaultProps = {
	stocksArray: []
};

// Maps the store's properties to the above component's props in order 
// to re-render the stockContainer with the proper stock list
function mapStateToProps(state) {
	return {
			stocksArray: state.stocksArray
	};
}

export default connect(mapStateToProps)(StockContainer);
