import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function ListItem(props) {
  const { url, onclick, children } = props;
  const iProps = {
    className: 'list-item',
  };

  if (url) {
    return (
      <Link to={url} {...iProps}>
        {children}
      </Link>
    );
  } else if (onclick) {
    return (
      <button onClick={onclick} {...iProps}>
        {children}
      </button>
    );
  }
  return (
    <div {...iProps}>
      {children}
    </div>
  );

}

ListItem.propTypes = {
  url: PropTypes.string,
  onclick: PropTypes.func,
  children: PropTypes.node,
};
