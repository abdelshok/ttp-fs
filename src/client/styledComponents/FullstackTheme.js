// Theme used for coloring and general styling of Components shapes that are shared
// across the application.
// Ie. All boxes/blocks whether it is for login or for the experiences have the same
// background color, box-radius shape, and shadow
// Height, width, margin, coloring of general content, etc. between
// different components is determined within the StyledComponents themselves,
// as each one of them has an
// individual styling that isn't shared by the remaining components of the application
// In this way, we have one source of truth that is kept at a minimum for the styling of
// the different components of the application

const FullstackTheme = {
  applicationGeneralColor: '#000', // Black
  applicationTextColor: 'black',
  fontFamily: 'Crimson Text',  // Similar to Miller, Georgia. Serif is a better look.
  blockBackgroundColor: 'white',
  boxShadow: 'rgba(171, 171, 171, 0.39) 0px 2px 32px 0px',
  blockBorderRadius: '3px',
  appBackgroundColor: 'rgb(255, 255, 255)',
  buttonBorderRadius: '1px',
  buttonBackgroundColor: 'white',
  experienceBlockFontColor: 'black',
  footerBackgroundColor: 'white',
  navigationBarBackgroundColor: 'white',
  footerTextSize: '12px',
};

// To change:
// "Box" and "Block" are used interchangeably. Use only one term, too confusing.
// em is used instead of px in certain places. Again, pick one.

// Explanation:
// blockBorderRadius: changes border radius of all block/boxes in the app, ie. login box, signup box, etc.
// appBackgroundColor: general background color of the website. Set to light grey.
// buttonBorderRadius: general border radius for all buttons in the application. Colors of
// buttons might diff‡er. if color of buttons do not differ a buttonBackgroundColor prop will be
// added blockBackgroundColor: changes background color of all blocks, such as the login blocks,
// the experience blocks, sign up blocks, companie blocks, etc.
// navigationBarBackgroundColor: self explanatory.

// Notes:
// Pass down this Theme as a prop to any component that will utilize one of it's styles
// Font Family constant is passed to all components except:
// - NormaLText, CenteredDiv, Linktext, rendered in the Login.js container
// - Rgb(199,199,199) is shared between different components, see if you can add it here

export default FullstackTheme;
