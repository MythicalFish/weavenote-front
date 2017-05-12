import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function ListItemWrapper(props) {
  const { url, children } = props;
  return (
    <Link to={url} className="flex justify-between items-center bb1 bg-white dark7 x-fill p1">
      {children}
    </Link>
  );
}

ListItemWrapper.propTypes = {
  url: PropTypes.string,
  children: PropTypes.node,
};
