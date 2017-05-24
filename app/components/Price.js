import React, { PropTypes } from 'react';
import { FormattedNumber } from 'react-intl';

export default function Price(props) {
  const currency = props.currency || 'GBP';
  return (
    <FormattedNumber value={props.value} style="currency" currency={currency} />
  );
}

Price.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  currency: PropTypes.string,
};

