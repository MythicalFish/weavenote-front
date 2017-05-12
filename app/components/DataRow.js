import React, { PropTypes } from 'react';
import SelectInput from 'components/SelectInput';

export default function DataRow(props) {

  const { label, type } = props;
  let field = null;
  let input = null;
  let touched = false;
  let error = false;
  let rowClass = 'data-row';

  if (type === 'display') {
    const { value } = props;
    field = <div className="right-align">{value}</div>;
  } else {
    const { input, meta: { touched, error } } = props;
    switch (type) {
      case 'select':
        field = <SelectInput {...props} className="right-align" />;
        break;
      case 'textarea':
        field = <textarea {...input} />;
        rowClass += ' flex-wrap';
        break;
      default:
        field = <input {...input} type={type} className="right-align" />;
        break;
    }
  }

  return (
    <div className={rowClass}>
      <label>{label}</label>
      {field}
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
}

DataRow.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};
