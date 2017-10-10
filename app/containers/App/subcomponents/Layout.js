import React, { PropTypes } from 'react';
import Sidebar from './Sidebar';

export default function Layout(props) {
  return (
    <div id="app-container" className="flex">
      <Sidebar {...props} />
      <div className="flex-auto flex y-fill">{props.children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
