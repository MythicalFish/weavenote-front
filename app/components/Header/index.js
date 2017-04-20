import React from 'react';
import { authService } from 'containers/Auth';

function Header() {
  return (
    <div className="flex items-center justify-between p2 bg-white dark8">
      <div></div>
      <nav>
        <button className="" onClick={authService.logout.bind(this)}>Logout</button>
      </nav>
    </div>
  );
}

export default Header;
