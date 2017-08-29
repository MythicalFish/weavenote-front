import React, { PropTypes } from 'react';
import Sidebar from './Sidebar';

export default function Layout(props) {
  return (
    <div className="flex">
      <div className="flex-none blurrable">
        <Sidebar {...props} />
      </div>
      <div className="flex-auto flex">{props.children}</div>
    </div>
  );
}

Layout.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
};
