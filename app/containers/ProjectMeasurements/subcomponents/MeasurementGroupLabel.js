import React, { PropTypes } from 'react';
import Field from './Field';

const MeasurementGroupLabel = ({ fieldName }) =>
  <Field name={fieldName} maxLength={3} />;

MeasurementGroupLabel.propTypes = {
  fieldName: PropTypes.string,
};

export default MeasurementGroupLabel;
