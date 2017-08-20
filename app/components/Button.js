import React from 'react';
import { Link } from 'react-router';
import Icon from 'components/Icon';
import InlineIcon from 'components/InlineIcon';

export default function Button(props) {
  //
  let className = props.className || 'btn';
  if (props.small) className += ' btn-sm';
  if (props.large) className += ' btn-lg';
  if (props.inline) className += ' btn-inline';
  if (props.shy) className += ' btn-shy';
  if (props.secondary) className += ' btn-secondary';

  const bProps = {
    className,
  };

  const W = ({ children }) => {
    if (props.to) {
      return (
        <Link {...bProps} to={props.to}>
          {children}
        </Link>
      );
    } else if (props.download) {
      return (
        <a {...bProps} href={props.download} download>
          {children}
        </a>
      );
    } else {
      bProps.disabled = !!props.disabled;
      bProps.onClick = props.onClick;
      bProps.type = props.type || 'button';
      return (
        <button {...bProps}>
          {children}
        </button>
      );
    }
  };

  W.propTypes = {
    children: React.PropTypes.node,
  };

  return (
    <W>
      {props.inlineIcon && <InlineIcon name={props.inlineIcon} />}
      {props.icon && <Icon name={props.icon} size={18} />}
      {props.label || null}
    </W>
  );
}

Button.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  icon: React.PropTypes.string,
  to: React.PropTypes.string,
  inlineIcon: React.PropTypes.string,
  small: React.PropTypes.bool,
  download: React.PropTypes.string,
  shy: React.PropTypes.bool,
  large: React.PropTypes.bool,
  secondary: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  label: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};
