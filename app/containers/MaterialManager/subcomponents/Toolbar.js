import React from 'react';
import Icon from 'components/Icon';
import UserMenu from 'components/UserMenu';

export default function Toolbar() {
  return (
    <header className="toolbar toolbar-flex blurrable bb1">
      <Icon to="/projects" color="gray" name="ArrowLeft" size={26} />
      <UserMenu />
    </header>
  );
}
