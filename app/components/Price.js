import React, { PropTypes } from 'react';
import { FormattedNumber } from 'react-intl';

export default function Price(props) {
  return (
    <FormattedNumber value={props.value} style="currency" currency="GBP" />
  );
}

Price.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

