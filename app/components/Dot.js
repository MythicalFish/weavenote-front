import React from 'react';

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
  size: React.PropTypes.number,
  color: React.PropTypes.string,
  className: React.PropTypes.string,
};
