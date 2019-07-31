// Navigation Bar Text Link
// Component that styles the links in the navigation bar, which for now:
// - Allows user to visit the main page, which is either the Login or the User page depending
// on authentication
// - Allows the user to logout once the user is identified, and potentially in the future, 
// also access user profile information, settings, etc.

import styled from 'styled-components';

const NavigationBarTextLink = styled.p`
  font-family: ${props => props.FullstackTheme.fontFamily};
  display: inline-block;
  color: black;
  font-size: 14px;
`;

// Height of text specified above is not working for some reason
// Fixed it by replacing height with font-size.
// Oddly, it's still 21px.

export default NavigationBarTextLink;
