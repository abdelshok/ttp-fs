// Stock List Component
// Component that returns a list of all the stocks owned by the user

// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

function Row(props) {
    const { index, style } = props;
  
    return (
      <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}
  
Row.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default Row;