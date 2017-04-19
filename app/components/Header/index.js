import React from 'react';
import { Link } from 'react-router';
import { authService } from 'containers/Auth';

function Header() {
  return (
    <div className="flex items-center justify-between p2 bb1 bg-gray-darker light9">
      <div>Seamless</div>
      <nav>
        <Link className="inline-block p2 aqua smaller1" to="/">Home</Link>
        <Link className="inline-block p2 aqua smaller1" to="/projects">Projects</Link>
        <button className="" onClick={authService.logout.bind(this)}>Logout</button>
      </nav>
    </div>
  );
}

export default Header;
