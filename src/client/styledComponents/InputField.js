// Input Field
// - Input field with general style. Does not have a border.
// - Meant to be used in the InputFieldAndIconContainer component which does have a border, wrapping
// both this InputField and the IconComponent that comes with it
// - Can be used outside of InputFieldAndIconContainer component but in that case, would need to be
// "extended" (added more styling) and border would need to be colored for it to be seen

import styled from 'styled-components';

const InputField = styled.input`
  font-family: ${props => props.FullstackTheme.fontFamily};
  font-size: 13px;
  text-align: left;
  color: black;
  border-color: none;
  background-color: ${props => props.FullstackTheme.blockBackgroundColor};
  border: 0px solid;
  display: inline-block;
  &:focus {
    outline-width: 0;
    color: black;
  }
`;

export default InputField;

