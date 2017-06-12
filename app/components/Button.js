import React from 'react';

export default function Button(props) {

  const type = props.type || 'button';
  const disabled = props.disabled || false;
  const className = props.className || '';
  const label = props.label || 'Submit';
  const onclick = props.onclick || null;

  return (
    <button className={`btn-color2x ${className}`} type={type} disabled={disabled} onClick={onclick}>
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
  label: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onclick: React.PropTypes.func,
};

