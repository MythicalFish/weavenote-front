import React, { PropTypes } from 'react';
import Sidebar from './Sidebar';

export default function Layout(props) {
  return (
    <div className="flex bg-gray-lightest">
      <div className="flex-none bg-bluewood blurrable">
        <Sidebar currentPath={props.location.pathname} />
      </div>
      <div className="flex-auto">
        {props.children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
};
