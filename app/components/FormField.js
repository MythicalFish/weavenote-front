import React, { PropTypes } from 'react';
import Input from 'components/FormInput';
import Focusable from 'containers/Focusable';

export function FormField(props) {
  const { label, className, focusClass, style } = props;
  let klass = 'field';
  klass += className ? ` ${className}` : '';
  klass += focusClass ? ` ${focusClass}` : '';
  klass += style ? ` field-style-${style}` : ' field-style-default';
  return (
    <div className={klass}>
      <label>
        {label}
      </label>
      <Input {...props} onFocus={props.focusThis} />
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string,
  focusThis: PropTypes.func,
  className: PropTypes.string,
  focusClass: PropTypes.string,
  style: PropTypes.string,
};

export default Focusable(FormField, 1);
