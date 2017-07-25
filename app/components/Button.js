import React from 'react';

export default function Button(props) {
  const type = props.type || 'button';
  const disabled = props.disabled || false;
  const label = props.label || null;
  let className = props.className || 'btn';
  if (props.small) {
    className += ' btn-sm';
  } else if (props.large) {
    className += ' btn-lg';
  }
  if (props.inline) {
    className += ' btn-inline';
  }
  if (props.glyph) {
    className += ' glyph';
  }
  if (props.shy) {
    className += ' btn-shy';
  }
  if (props.footer) {
    className += ' btn-footer';
  }
  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={props.onClick}
    >
      {props.icon && <i className={`fa fa-${props.icon} mr1`} />}
      {label}
    </button>
  );
}

Button.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  icon: React.PropTypes.string,
  small: React.PropTypes.bool,
  shy: React.PropTypes.bool,
  large: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  glyph: React.PropTypes.bool,
  footer: React.PropTypes.bool,
  label: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};
