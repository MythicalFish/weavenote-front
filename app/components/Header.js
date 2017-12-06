import React, { PropTypes } from 'react';
import UserMenu from 'components/UserMenu';

const Header = (props) => (
  <header id="app-header" className="justify-end" style={props.style}>
    {props.user && <UserMenu />}
  </header>
);

Header.propTypes = {
  style: PropTypes.object,
  user: PropTypes.object,
};

export default Header;
