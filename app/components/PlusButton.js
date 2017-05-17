import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function PlusButton(props) {
  const className = 'glyph';
  const icon = <i className="fa fa-plus-circle"></i>;
  if (props.onClick) {
    return (
      <button className={className} onClick={props.onClick}>
        {icon}
      </button>
    );
  } else if (props.to) {
    return (
      <Link className={className} to={props.to}>
        {icon}
      </Link>
    );
  }
}

PlusButton.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
};

