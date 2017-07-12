import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function PlusButton(props) {
  const bProps = {
    className: 'glyph',
  };
  const iProps = {
    className: 'fa fa-plus-circle',
  };
  if (props.color) {
    iProps.className += ` ${props.color}`;
  } else {
    iProps.className += ' gray';
  }
  const icon = <i {...iProps} />;
  if (props.onClick) {
    return (
      <button {...bProps} onClick={props.onClick}>
        {icon}
      </button>
    );
  } else if (props.to) {
    return (
      <Link {...bProps} to={props.to}>
        {icon}
      </Link>
    );
  } else if (props.children) {
    return (
      <div {...bProps}>
        {icon}
        {props.children}
      </div>
    );
  }
}

PlusButton.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
};
