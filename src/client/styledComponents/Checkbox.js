// Simple checkbox: designed to be accompanied by a text, positioned in a div of determined
// width (not too big) because the checkbox automatically places itself of the parent div it
// is within. If the div/parent is too wide, then the space between the checkbox and the
// text will be too large.

import styled from 'styled-components';

const Checkbox = styled.input`
  font-family: ${props => props.FullstackTheme.fontFamily};
  font-size: 12px;
  color: rgb(211, 210, 210);
  position: absolute;
  left: 0;
`;

// Pretty sure font-family in checkbox is unnecessary

export default Checkbox;
