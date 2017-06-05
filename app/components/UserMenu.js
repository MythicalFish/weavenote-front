import React from 'react';
import { Link } from 'react-router';
import Dropdown from 'components/Dropdown';
import * as authUtils from 'utils/authUtils';

export default function UserMenu() {
  return (
    <Dropdown label="...">
      <Link to="/organization">Organization settings</Link>
      <button onClick={() => { authUtils.logout(); }}>Logout</button>
    </Dropdown>
  );
}
