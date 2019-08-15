// BUY STOCK COMPONENT
// Re-usable component used to purchase stocks
// Constitutes a box, with basic input fields for the stock name and stock quantity.
// Connected here to the IEX trading API through axios.

// Packages
import styled from 'styled-components';
import React, { Component } from 'react';
import axios from 'axios';
import date from 'date-and-time';
// Internal modules
import store from '../store/store';
import { setPortfolioAmount } from '../action-creators/actions';
import Box from '../styledComponents/Box';
import Button from '../styledComponents/Button';
import InputField from '../styledComponents/InputField';
import BoxTitleText from '../styledComponents/BoxTitleText';
import InputFieldAndIconContainer from '../styledComponents/InputFieldAndIconContainer';
import FullstackTheme from '../styledComponents/FullstackTheme';
// Environment Variables
import config from '../config';
// For generation of a secure Cryptographic key
const cryptoRandomString = require('crypto-random-string');

const SpecialBox = styled(Box)`
  border-radius: ${props => props.FullstackTheme.blockBorderRadius};
  border-color: rgb(199, 199, 199);
  &:hover {
    border-color: black;
  }
  border-width: thin;
  border-style: solid;
  margin-left: 20%;
  margin-top: 110px;
  height: 340px;
`;

const PurchaseBox = styled(Button)`
  margin-top: 20px;
`;

class BuyStockComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stockTicket: '',
            quantity: 1
        };
    }

    // Method used to disable submit button while stockTicket and quantity
    // lengths are not validated
    validateForm = () => this.state.stockTicket.length > 0 && this.state.quantity.length > 0;

    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value,
        });
        console.log('State of email', this.state.stockTicket); 
        console.log('State of quantity', this.state.quantity);
      };

    handleSubmit = async (event) => {
      event.preventDefault();
      const { stockTicket, quantity } = this.state;

      // Left to do:
      // Necessary: set up front-end redux store in order to store and update the portfolio data
      // Potentially: set timer so that function is triggered every hour to check current price
      // and update the stock color accordingly
      try {
        // Final link of IEX API
        const iexLink = config.IEX.IEX_LINK_FIRST + stockTicket + config.IEX.IEX_LINK_SECOND + config.IEX.IEXCLOUD_SECRET_KEY;
        // Variables will store the returned data from our request to the IEX API
        let returnedData;
        let stockData;
        const now = new Date();


        try {
          returnedData = await axios.get(iexLink);
          console.log('Stock data is', returnedData);
          // Object containing stock information request by the user
          stockData = returnedData.data;
          const { portfolioAmount, userId, email } = store.getState();
          const totalPrice = Number(stockData.latestPrice) * quantity;
          // Current date calculated in order to be stored with transactions in the DynamoDB table
          const currentDate = date.format(now, 'MM/DD/YYYY');
          // Cryptographic transaction ID generated of length 6 to act as transaction's sorting key
          const transactionId = cryptoRandomString({ length: 6, type: 'base64' });
          // A body object is created with the associated user email in order
          // to store the transaction and the newly bought stocks in the database
          const stockParameters = {
            email,
            user_id: userId,
            symbol: stockData.symbol,
            companyName: stockData.companyName,
            currentPrice: stockData.latestPrice,
            quantity: Number(quantity),
            totalPrice,
            openPrice: stockData.open == null ? Number(stockData.previousClose) : Number(stockData.open),
            currentDate,
            transactionId
          };
          // NOTE: Make sure that the 'open' attribute of the stock data returned by  
          // IEX API is the actual opening price of the day - if it is not, we use the
          // 'previousClose' attribute which could be the next day's opening price
          // assuming that markets don't fluctuate

          console.log('Body of new stock:', stockParameters);

          // Add or update stock / transaction data within DynamoDB
          this.addStockTransaction(stockParameters);
          
          // If the new portfolio amount is below 0, balance is low, do not allow transaction
          // or update user portfolio. If not, update user information locally and in DB.
          const newPortfolioAmount = Number(portfolioAmount) - Math.floor(totalPrice);
          if (newPortfolioAmount >= 0) {
            console.log('Amount remaining in portfolio: ', newPortfolioAmount);
            this.updateUserPortfolio(email, newPortfolioAmount);
          } else {
            alert('Price: ' + totalPrice +  '. Balance too low. Transaction cannot be made.');
          }
        // Alert user if the input entered is incorrect (ie. inexistent company ticker)
        } catch (err) {
          console.log('Call to IEX API failed. Error message is: ', err);
          alert('Call to IEX API failed. Please enter a correct input.');
        }
      } catch (err) {
        alert(err.message); // eslint-disable-line
      }
    }
   
    addStockTransaction = async(stockTransactionParameters) => {
      try {
        const addedStockTransactionData = await axios.put(config.gateway.ADDSTOCKTRANSACTION_LINK, stockTransactionParameters);
        console.log("Added stock transaction data retrieved", addedStockTransactionData);
        // Pass here the newly acquired data object to the redux store in order to update the client-side accordingly
      } catch (err) {
        alert("Error adding or updating stock and transaction data");
      }
    }

    // Update user portfolio in local state and dynamoDB accordingly
    updateUserPortfolio = async (email, newPortfolioAmount) => {
      const newPortfolioParameters = {
        email,
        portfolioAmount: newPortfolioAmount
      };

      try {
        // Modifies portfolio amount in redux state by dispatching action to reducer
        store.dispatch(setPortfolioAmount(newPortfolioAmount));
        // Modifies portfolio amount in DynamoDB and returns the updated value
        const updatedUserData = await axios.put(config.gateway.UPDATEUSER_LINK, newPortfolioParameters);
        console.log('Updated user data from DynamoDB', updatedUserData);
      } catch (err) {
        alert('Error updating portfolio in DynamoDB or in setPorfolio dispatch');
      }
    }

     render() {
      return (
        <SpecialBox FullstackTheme={FullstackTheme}>
        <div>
          <BoxTitleText FullstackTheme={FullstackTheme}>
            Stocks
            {''}
          </BoxTitleText>
          <form onSubmit={this.handleSubmit} value>
            <InputFieldAndIconContainer FullstackTheme={FullstackTheme}>
              <InputField
                type="text"
                value={this.state.stockTicket.toUpperCase()}
                placeholder="Ticket"
                id="stockTicket"
                onChange={this.handleChange}
                FullstackTheme={FullstackTheme}
              />
            </InputFieldAndIconContainer>

            <InputFieldAndIconContainer FullstackTheme={FullstackTheme}>
              <InputField
                type="number"
                value={Math.abs(Math.floor(this.state.quantity))}
                placeholder="Quantity"
                id="quantity"
                onChange={this.handleChange}
                FullstackTheme={FullstackTheme}
              />
            </InputFieldAndIconContainer>

            <PurchaseBox
              type="submit"
              text="login"
              FullstackTheme={FullstackTheme}
              disabled={!this.validateForm()}
            >
              {' '}
              Purchase
              {' '}
            </PurchaseBox>
          </form>
        </div>
        </SpecialBox>
    );
  }
}

export default BuyStockComponent;
