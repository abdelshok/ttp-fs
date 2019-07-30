// Packages
import styled from 'styled-components';
import React, { Component } from 'react';
// Internal modules
import store from '../store/store';
// import action creators
import Box from '../styledComponents/Box';
import Button from '../styledComponents/Button';
import LinkText from '../styledComponents/LinkText';
import InputField from '../styledComponents/InputField';
import NormalText from '../styledComponents/NormalText';
import CenteredDiv from '../styledComponents/CenteredDiv';
import BoxTitleText from '../styledComponents/BoxTitleText';
import InputFieldLogo from '../styledComponents/InputFieldLogo';
import InputFieldAndIconContainer from '../styledComponents/InputFieldAndIconContainer';
import FullstackTheme from '../styledComponents/FullstackTheme';

const SpecialBox = styled(Box)`
  border-radius: ${props => props.FullstackTheme.blockBorderRadius};
  border-color: rgb(199, 199, 199);
  &:hover {
    border-color: black;
  }
  border-width: thin;
  border-style: solid;
  margin-left: 20%;
  margin-top: 25%;
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
        console.log('State of password', this.state.quantity);
      };
    
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
            {/* EmailFieldComponent would replace the above piece of code */}

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
  };
}

export default BuyStockComponent;

// <InputFieldLogo src={EmailIcon} />
// <InputFieldLogo src={LockIcon} />
