import React from 'react';

export default function Button(props) {

  const type = props.type || 'button';
  const disabled = props.disabled || false;
  const label = props.label || 'Submit';
  const onclick = props.onclick || null;
  let className = props.className || '';
  if (props.sm) {
    className += ' btn-sm';
  } else if (props.lg) {
    className += ' btn-lg';
  }

  return (
    <button className={`btn btn-color2x ${className}`} type={type} disabled={disabled} onClick={onclick}>
      {props.icon &&
        <i className={`fa fa-${props.icon} mr1`}></i>
      }
      {label}
    </button>
  );
}

Button.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  icon: React.PropTypes.string,
  sm: React.PropTypes.bool,
  lg: React.PropTypes.bool,
  label: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onclick: React.PropTypes.func,
};

