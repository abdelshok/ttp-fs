// BUY STOCK COMPONENT
// Re-usable component used to purchase stocks
// Constitutes a box, with basic input fields for the stock name
// and stock quantity.
// Connected here to the IEX trading API through axios.

// Packages
import styled from 'styled-components';
import React, { Component } from 'react';
import axios from 'axios';
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

const SpecialBox = styled(Box)`
  border-radius: ${props => props.FullstackTheme.blockBorderRadius};
  border-color: rgb(199, 199, 199);
  &:hover {
    border-color: black;
  }
  border-width: thin;
  border-style: solid;
  margin-left: 20%;
  margin-top: 12%;
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

      // 1. Send data to database to store transaction and stock (last order of business)
      // 2. Update data locally and re-render (do it second)
      // 3. Calculate the amount left and send it to database (first order of business)
      // In handleSubmit function, we will 1. look up the stock through IEX API
      // receive the stock price, 2. calculate the total price and store locally
      // 3. Store the name of the stock and quantity in an array/hash_map locally and update
      // frontend accordingly 4. send new portfolio amount to DB
      // 5. Update the transaction and portfolio databases accordingly
      // 6. Set up a timer so that the function is triggered every hour to retrieve
      // the stocks and compare them to the opening prices
      // Do at the end
      try {
        // Final link of IEX API
        const iexLink = config.IEX.IEX_LINK_FIRST + stockTicket + config.IEX.IEX_LINK_SECOND + config.IEX.IEXCLOUD_SECRET_KEY;
        // Variables will store the returned data from our request to the IEX API
        let returnedData;
        let stockData;
        try {
          returnedData = await axios.get(iexLink);
          console.log('Stock data is', returnedData);
          stockData = returnedData.data;
          const { portfolioAmount, userId, email } = store.getState();
          const totalPrice = Number(stockData.latestPrice) * quantity;
  
          // A body object is created with the associated user email in order
          // to store the transaction and the newly bought stocks in the database
          const stockParameters = {
            email,
            userId,
            symbol: stockData.symbol,
            companyName: stockData.companyName,
            latestPrice: stockData.latestPrice,
            quantity: Number(quantity),
            totalPrice,
            openPrice: stockData.open == null ? Number(stockData.previousClose) : Number(stockData.open)
          };
          // NOTE: Make sure that the open attribute of the returned data
          // references the actual opening price of the day
          console.log('Body of new stock:', stockParameters);
  
          // If the new portfolio amount is below 0, balance is low, do not allow transaction
          // or update user portfolio. If new portfolio amount is above 0, balance is enough,
          // update user information locally and in DB.
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
