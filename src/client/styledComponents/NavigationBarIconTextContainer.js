// Navigation Bar Icon and Text
// - Component that wraps the Navigation Bar links and their respective logo.
// - IMPORTANT/To modify later: Hover works for the text but not for logo
import styled from 'styled-components';

const NavigationBarIconTextContainer = styled.div`
  height: 30px;
  &:hover {
    color: rgb(0, 209, 107);
  }
  color: black;
  cursor: pointer;
`;

// font-weight: ${props => (props.important ? "bold" : "normal")};

export default NavigationBarIconTextContainer;
