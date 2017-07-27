import React from 'react';
import UserMenu from 'components/UserMenu';

const Header = () =>
  <div className="toolbar blurrable">
    <div />
    <div className="px2">
      <UserMenu />
    </div>
  </div>;

export default Header;
