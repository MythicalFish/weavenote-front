import React from 'react';
import Dropdown from 'components/Dropdown';
import { Auth0 } from 'containers/Auth';

export default function UserMenu() {
  return (
    <Dropdown label="...">
      <button className="btn" onClick={() => { Auth0.logout(); }}>Logout</button>
    </Dropdown>
  );
}
