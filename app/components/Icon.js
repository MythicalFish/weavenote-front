import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as FeatherIcons from 'react-feather';

const Icon = (props) => {
  let I = FeatherIcons[props.name];
  if (!I) I = FeatherIcons.Circle;
  const { color, size, tooltip, className } = props;
  const FeatherIcon = () => <I className={color || ''} size={size || 30} />;
  const bProps = { className: 'icon' };
  if (className) bProps.className += ` ${className}`;
  if (tooltip) bProps.className += ' tooltipped';

  if (props.onClick) {
    return (
      <button {...bProps} onClick={props.onClick} type="button">
        {tooltip && <div className="tooltip">{tooltip}</div>}
        <FeatherIcon />
      </button>
    );
  } else if (props.to) {
    return (
      <Link {...bProps} to={props.to}>
        <FeatherIcon />
      </Link>
    );
  }
  return (
    <div {...bProps}>
      <FeatherIcon />
      {props.children && props.children}
    </div>
  );
};

Icon.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.number,
};

export default Icon;
