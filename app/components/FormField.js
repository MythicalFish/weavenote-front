import React, { PropTypes } from 'react';
import Input from 'components/FormInput';
import Focusable from 'utils/Focusable';

const FormField = (props) => {
  const { label, className, focusClass, readOnly } = props;
  let theme = props.theme || 'default';
  if (readOnly) theme = 'default';
  let klass = 'field';
  klass += className ? ` ${className}` : '';
  klass += focusClass ? ` ${focusClass}` : '';
  klass += ` field-theme-${theme}`;
  return (
    <div className={klass}>
      {label && <label>{label}</label>}
      <Input {...props} onFocus={props.focusThis} />
    </div>
  );
};

FormField.propTypes = {
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  focusThis: PropTypes.func,
  className: PropTypes.string,
  focusClass: PropTypes.string,
  theme: PropTypes.string,
};

export default Focusable(FormField);
export { FormField };
