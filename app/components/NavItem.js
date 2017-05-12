import React from 'react';

export default function NavItem(props) {
  const { label, handleClick, isActive } = props;
  let buttonClass;
  if (isActive) { buttonClass = 'active'; }
  return (
    <button className={buttonClass} onClick={handleClick}>{label}</button>
  );
}

NavItem.propTypes = {
  label: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func,
  isActive: React.PropTypes.bool,
};

