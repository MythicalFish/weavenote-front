import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';

const ColField = ({ name, maxLength }) => {
  const ff = ({ input, type }) =>
    <input {...input} type={type} maxLength={maxLength} />;
  return <Field name={name} type="text" component={ff} maxLength={maxLength} />;
};

ColField.propTypes = {
  input: PropTypes.object,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  name: PropTypes.string,
};

export default ColField;
