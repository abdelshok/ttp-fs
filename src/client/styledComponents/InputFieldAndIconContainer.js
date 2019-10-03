// Input Field and Icon Wrapper
// - Component that wraps the input fields and their respective logo.
// - Border of the div becomes black when user hovers on it.

import styled from 'styled-components';

const InputFieldAndIconContainer = styled.div`
  height: 34px;
  background-color: ${props => props.FullstackTheme.blockBackgroundColor};
  width: 60%;
  border-radius: ${props => props.FullstackTheme.blockBorderRadius};
  border-color: white;
  overflow: auto;
  &:hover {
    border-color: #000;
    font-size: 16px;
    font-weight: bold;
    transition: .7s ease;
  }
  transition: 1s ease;
  border-width: thin;
  border-style: solid;
  margin: 0 auto;
  margin-bottom: 15px;
  padding-left: 15px;
  display: flex;
  align-items: center;
`;

export default InputFieldAndIconContainer;

// Height is set 2px more than the "InputField" height
// in order to make sure that they don't overlay on each other
// Because the input field makes the border of the div
// invisible
