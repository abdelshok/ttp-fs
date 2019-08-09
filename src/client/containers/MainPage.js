// MAIN PAGE Container
// - Main page for user, present after successful authentication.
// - Page will contain general information about the user and the two main uses of the app,
// either getting a list of past Transactions or looking at the current stocks held.

// Packages
import styled from 'styled-components';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// Internal Modules
import BuyStockComponent from '../components/BuyStockComponent';

// To finish: 
// - Page is going to shift between the transactions and the stocks owned
// - New component that will list the stock name, quantity, and total amount will be created
// - New component also to create for transactions: holds inside
// name of ticket, quantity bought, price of transaction.

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'stocks',
        };
    }

    render() {
        return ( 
        <div>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <BuyStockComponent />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper>xs=12 sm=6</Paper>
            </Grid>
        </Grid>
        </div>          
        )
    }
}




export default MainPage;