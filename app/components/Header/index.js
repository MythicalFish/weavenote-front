import React from 'react';
import { Auth0 } from 'containers/Auth';

function Header() {
  return (
    <div className="flex items-center justify-between p2 bg-white dark8">
      <div></div>
      <nav>
        <button className="" onClick={Auth0.logout.bind(this)}>Logout</button>
      </nav>
    </div>
  );
}

export default Header;
