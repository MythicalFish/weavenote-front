import React from 'react';

export default function Button(props) {
  const type = props.type || 'button';
  const disabled = props.disabled || false;
  const label = props.label || null;
  const onclick = props.onclick || null;
  let className = props.className || '';
  if (props.small) {
    className += ' btn-sm';
  } else if (props.large) {
    className += ' btn-lg';
  }
  if (props.inline) {
    className += ' btn-inline';
  } else {
    className += ' btn-color2x';
  }
  return (
    <button
      className={`btn ${className}`}
      type={type}
      disabled={disabled}
      onClick={onclick}
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
  large: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  label: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onclick: React.PropTypes.func,
};
