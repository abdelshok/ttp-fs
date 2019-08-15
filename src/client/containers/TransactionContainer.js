// Transaction Container 
// React container which will hold and display all of the user's retrieved transactions
// from the AWS DynamoDB database

// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Internal modules 
import StockPortfolioContainer from '../styledComponents/StockPortfolioContainer';
import FullstackTheme from '../styledComponents/FullstackTheme';
import store from '../store/store';
import PortfolioText from '../styledComponents/PortfolioText';
import styled from 'styled-components';

const TransactionText = styled(PortfolioText)`
    color: black;
`;

class TransactionContainer extends Component {
    constructor(props, context) {
				super(props, context);
    }

    render() {
			console.log('Transaction container props are', this.props);

			// Creates a JSX list of all the different Stock components
			const transactionList = this.props.transactionsArray.map((transaction, index) => {
				return (
                        // stock passed as props to TransactionText styled component because it requires it
                        // in order to generally choose the color of the stock text, although this feature
                        // is negated by 'extending' the PortfolioText above by calling it TransactionText
                        // and re-declaring the color of the text as black - 
						<TransactionText FullstackTheme={FullstackTheme} stock={transaction} key={index}> 
							<div> {transaction.companyName} x {transaction.quantity} : ${Math.floor(transaction.totalPrice)} </div>
							<div> {transaction.datePurchased} </div>
						</TransactionText>
				);
			});

			return (
				<StockPortfolioContainer FullstackTheme={FullstackTheme} >
						{transactionList}
				</StockPortfolioContainer>
			);
    };
};

// Typechecking for the TransactionContainer props
TransactionContainer.propTypes = {
	transactionsArray: PropTypes.array
};

// Sets the defaultProps of the TransactionContainer to empty arrays
TransactionContainer.defaultProps = {
	transactionsArray: []
};

// Maps the store's properties to the above component's props in order 
// to re-render the TransactionContainer with the proper stock list
function mapStateToProps(state) {
	return {
			transactionsArray: state.transactionsArray
	};
}

export default connect(mapStateToProps)(TransactionContainer);
