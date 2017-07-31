import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';

const ColumnField = ({ name, maxLength }) => {
  const F = ({ input, type }) =>
    <input {...input} type={type} maxLength={maxLength} />;
  return <Field name={name} type="text" component={F} maxLength={maxLength} />;
};

ColumnField.propTypes = {
  input: PropTypes.object,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  name: PropTypes.string,
};

export default ColumnField;
