import React from 'react';
import UserMenu from 'components/UserMenu';

const Header = () =>
  <header className="blurrable flex justify-end py2">
    <UserMenu />
  </header>;

export default Header;
