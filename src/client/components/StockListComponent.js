// Stock List Component
// Component that returns a list of all the stocks owned by the user

// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Internal Modules
import StockText from '../styledComponents/StockText';
import FullstackTheme from '../styledComponents/FullstackTheme';

class StockListComponent extends Component {
    constructor(props) {
        super(props);
        console.log('Props are', props)
    }

    render(){
        console.log('Props stocks are', props.stock);
        return (
            <StockText FullstackTheme={FullstackTheme} > Apple </StockText>
        )
    }
}

export default StockListComponent;

// TO DELETE