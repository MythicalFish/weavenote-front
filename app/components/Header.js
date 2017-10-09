import React from 'react';
import UserMenu from 'components/UserMenu';

const Header = () => (
  <header id="app-header" className="flex justify-end py3">
    <UserMenu />
  </header>
);

export default Header;
