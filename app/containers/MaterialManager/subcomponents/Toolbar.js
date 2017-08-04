import React from 'react';
import Icon from 'components/Icon';

export default function Toolbar() {
  return (
    <header className="toolbar container-narrower px2">
      <Icon to="/materials" color="gray" name="ArrowLeft" size={26} />
    </header>
  );
}
