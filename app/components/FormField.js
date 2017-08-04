import React from 'react';
import Input from 'components/FormInput';
import Focusable from 'containers/Focusable';

function FormField(props) {
  const { label, type, className, focusClass } = props;

  return (
    <div className={`field ${className || ''} ${focusClass}`}>
      <label>
        {label}
      </label>
      <Input {...props} onFocus={props.focusThis} />
    </div>
  );
}

export default Focusable(FormField, 1);
