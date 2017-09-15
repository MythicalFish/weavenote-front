import React, { PropTypes } from 'react';
import Input from 'components/FormInput';
import Focusable from 'utils/Focusable';

const FormField = (props) => {
  const { label, className, focusClass, theme } = props;
  let klass = 'field';
  klass += className ? ` ${className}` : '';
  klass += focusClass ? ` ${focusClass}` : '';
  klass += theme ? ` field-theme-${theme}` : ' field-theme-default';
  return (
    <div className={klass}>
      <label>{label}</label>
      <Input {...props} onFocus={props.focusThis} />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  focusThis: PropTypes.func,
  className: PropTypes.string,
  focusClass: PropTypes.string,
  theme: PropTypes.string,
};

export default Focusable(FormField);
export { FormField };
