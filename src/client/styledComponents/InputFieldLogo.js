// Sizing and styling of logos that will be next to the InputField.
// For now logos are the Email and Password logo but future ones include:
// - Profile logo, in the signup page
// This component will ensure they are all of the same size and style.

import styled from 'styled-components';

const InputFieldLogo = styled.img`
  width: 17px;
  margin-right: 28px;
  display: inline-block;
`;

export default InputFieldLogo;
