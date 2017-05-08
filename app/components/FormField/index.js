import React from 'react';
import SelectInput from 'components/SelectInput';

export default function renderField(props) {
  const { input, label, type, meta: { touched, error } } = props;
  let field = <input {...input} type={type} />;
  if (type === 'select') { field = <SelectInput {...props} />; }
  return (
    <div>
      <div className="item">
        <label>{label}</label>
        {field}
      </div>
      {touched && error && <span>{error}</span>}
    </div>
  );
}
