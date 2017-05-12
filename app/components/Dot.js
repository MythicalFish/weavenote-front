import React from 'react';

export default function Dot(props) {
  return (
    <div className={`dot ${props.className}`} style={{ backgroundColor: props.color }}></div>
  );
}

Dot.propTypes = {
  color: React.PropTypes.string,
  className: React.PropTypes.string,
};

