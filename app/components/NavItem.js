import React, { PropTypes } from 'react';

export default function NavItem(props) {
  const { label, handleClick, isActive, className } = props;
  let buttonClass = className || '';
  if (isActive) buttonClass += ' active';
  buttonClass += ' nav-item';
  return (
    <button className={buttonClass} onClick={handleClick}>
      {label}
    </button>
  );
}

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  isActive: PropTypes.bool,
  className: PropTypes.string,
};
