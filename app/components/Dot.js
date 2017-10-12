import React, { PropTypes } from 'react';

export default function Dot({ className, color, size }) {
  const dProps = {
    className: `dot ${className || ''}`,
    style: { backgroundColor: color },
  };
  if (size) {
    dProps.style.width = `${size}px`;
    dProps.style.height = `${size}px`;
  }
  return <div {...dProps} />;
}

Dot.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};
