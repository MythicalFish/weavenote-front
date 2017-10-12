import React, { PropTypes } from 'react';

export default function NavItem(props) {
  const { label, handleClick, isActive } = props;
  let buttonClass;
  if (isActive) {
    buttonClass = 'active';
  }
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
};
