// Input Field
// - Input field with general style. Does not have a border.
// - Meant to be used in the InputFieldAndIcon component which does have a border, wrapping
// both this InputField and the IconComponent that comes with it
// - Can be used outside of InputFieldAndIcon component but in that case, would need to be
// "extended" (added more styling) and border would need to be colored for it to be seen

import styled from 'styled-components';

const InputField = styled.input`
  height: 38px;
  font-family: ${props => props.FullstackTheme.fontFamily};
  font-size: 13px;
  text-align: left;
  color: black;
  border-color: none;
  background-color: ${props => props.FullstackTheme.blockBackgroundColor};
  border: 0px solid;
  display: inline-block;
  margin: 0 auto;
  &:focus {
    outline-width: 0;
    color: black;
  }
`;

export default InputField;


// Height is set 2px less than the "InputFieldAndIcon" height
// in order to make sure that they don't overlay on each other
// Because the input field makes the border of the parent div
// invisible
