import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import Input from './Input';

const MeasurementGroupLabel = ({ fieldName }) =>
  <Field name={fieldName} maxLength={3} component={Input} />;

MeasurementGroupLabel.propTypes = {
  fieldName: PropTypes.string,
};

export default MeasurementGroupLabel;
