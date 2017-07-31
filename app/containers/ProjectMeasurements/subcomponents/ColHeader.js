import React, { PropTypes } from 'react';
import ColField from './ColField';

const ColHeader = ({ constraint }) =>
  <ColField
    name={`${constraint.type}[${constraint.index}].name`}
    maxLength={constraint.fieldLength || 3}
  />;

ColHeader.propTypes = {
  constraint: PropTypes.object,
};

export default ColHeader;
