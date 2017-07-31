import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import Input from './Input';

const MeasurementNameLabel = ({ fieldName, handleSubmit }) =>
  <Field
    name={fieldName}
    maxLength={8}
    component={Input}
    onBlur={handleSubmit}
  />;

MeasurementNameLabel.propTypes = {
  fieldName: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default MeasurementNameLabel;
