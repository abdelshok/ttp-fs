// Navigation Bar Icon and Text
// - Component that wraps the Navigation Bar links and their respective logo.
// - IMPROVE LATER:  Hover works for the text but not for logo

import styled from 'styled-components';

const NavigationBarIconTextContainer = styled.div`
  &:hover {
    color: rgb(0, 209, 107);
  }
  color: black;
  cursor: pointer;
`;

export default NavigationBarIconTextContainer;

// RESEARCH LATER: Removed height:30px here and both the Logout logo
// and the "Logout" text are more aligned with each other
