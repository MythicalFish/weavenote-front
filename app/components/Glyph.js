import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Glyph = (props) => {
  const Icon = () => {
    const color = props.color || 'gray';
    return <i className={`fa fa-${props.icon} ${color}`} />;
  };
  const bProps = {
    className: 'glyph',
  };
  if (props.onClick) {
    return (
      <button {...bProps} onClick={props.onClick} type="button">
        <Icon />
      </button>
    );
  } else if (props.to) {
    return (
      <Link {...bProps} to={props.to}>
        <Icon />
      </Link>
    );
  }
  return (
    <div {...bProps}>
      <Icon />
      {props.children && props.children}
    </div>
  );
};

Glyph.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default Glyph;
