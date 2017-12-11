import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as FeatherIcons from 'react-feather';

const Icon = (props) => {
  let I = FeatherIcons[props.name];
  if (!I) I = FeatherIcons.Circle;
  const {
    color,
    size,
    tooltip,
    className,
    children,
    onClick,
    to,
    image,
  } = props;
  let Graphic = () => <I className={color || ''} size={size || 30} />;
  if (image) Graphic = () => <img src={image} role="presentation" />;
  const bProps = { className: 'icon' };
  if (className) bProps.className += ` ${className}`;
  if (tooltip) bProps.className += ' tooltipped';
  const Wrapper = ({ children }) => {
    if (onClick) {
      return (
        <button {...bProps} onClick={onClick} type="button">
          {children}
        </button>
      );
    } else if (to) {
      return (
        <Link {...bProps} to={to}>
          {children}
        </Link>
      );
    }
    return <div {...bProps}>{children}</div>;
  };
  return (
    <Wrapper>
      <Graphic />
      {children && children}
      {tooltip && <div className="tooltip">{tooltip}</div>}
    </Wrapper>
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
  image: PropTypes.string,
};

export default Icon;
