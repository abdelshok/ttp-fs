// Navigation Bar Text Link
// Component that styles the links in the navigation bar, which for now:
// - allows him/her to logout, and potentially in the future, access user profile, etc.

import styled from 'styled-components';

const NavigationBarTextLink = styled.p`
  height: 28px;
  font-family: ${props => props.FullstackTheme.fontFamily};
  text-align: left;
  display: inline;
`;

// Height is set up to be 2px under the NavigationBarIconTextContainer height in order for it
// to fit inside of it, its parent div component

export default NavigationBarTextLink;
