import React, { PropTypes } from 'react';

export default function PriceSymbol(props) {
  const map = {
    GBP: '\u00A3',
    EUR: '\u20AC',
    USD: '\u0024',
  };
  return (
    <span className={props.className}>
      {map[props.code]}
    </span>
  );
}

PriceSymbol.propTypes = {
  code: PropTypes.string,
  className: PropTypes.string,
};

