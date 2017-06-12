import React from 'react';

export default function Button(props) {

  const type = props.type || 'button';
  const disabled = props.submitting || false;
  const className = props.className || '';
  const label = props.label || 'Submit';

  return (
    <button className={`btn-color2x ${className}`} type={type} disabled={disabled}>
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
  submitting: React.PropTypes.bool,
};

