import React from 'react';
import Dropdown from 'components/Dropdown';
import * as authUtils from 'utils/authUtils';

export default function UserMenu() {
  return (
    <Dropdown label="...">
      <button className="btn" onClick={() => { authUtils.logout(); }}>Logout</button>
    </Dropdown>
  );
}
