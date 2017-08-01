import React, { PropTypes } from 'react';

const Input = ({ input }) =>
  //
  <input {...input} type="text" />;

Input.propTypes = {
  input: PropTypes.object,
  // maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // onBlur: PropTypes.func,
};

export default Input;