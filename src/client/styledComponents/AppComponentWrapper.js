// App component wrapper: div in the background that sets the page height,
// background color of the page, etc.
import styled from 'styled-components';

const AppComponentWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${props => props.FullstackTheme.appBackgroundColor};
  position: fixed;
  left: 0;
  bottom: 0;
`;

export default AppComponentWrapper;
