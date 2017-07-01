import React from 'react';
import { Link } from 'react-router';

export default function Toolbar() {
  return (
    <header className="toolbar">
      <Link to="/materials" className="glyph glyph-sm gray">
        <i className="fa fa-arrow-left"></i>
      </Link>
    </header>
  );
}
