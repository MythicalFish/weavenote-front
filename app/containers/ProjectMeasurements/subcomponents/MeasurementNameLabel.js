import React, { PropTypes } from 'react';
import Field from './Field';

const MeasurementNameLabel = ({ fieldName }) =>
  <Field name={fieldName} maxLength={8} />;

MeasurementNameLabel.propTypes = {
  fieldName: PropTypes.string,
};

export default MeasurementNameLabel;
