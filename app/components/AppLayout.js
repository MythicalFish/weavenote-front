import React, { PropTypes } from 'react';
import Sidebar from 'components/Sidebar';

export default function AppLayout(props) {
  return (
    <div className="flex bg-gray-lightest">
      <div className="flex-none bg-color1x">
        <Sidebar currentPath={props.location.pathname} />
      </div>
      <div className="flex-auto">
        {React.Children.toArray(props.children)}
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
};

