// LOADER BUTTON COMPONENT
// - Used previously to show a loading icon when user logged in. 
// NOT USED BUT DO NOT DELETE --> WILL BREAK THE APP

// Packages
import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

// Styles
import '../css/LoaderButtonComponent.css';

export default ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) => (
  <Button
    className={`LoaderButtonComponent ${className} LoaderButton-Style`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
    {!isLoading ? text : loadingText}
  </Button>
);
