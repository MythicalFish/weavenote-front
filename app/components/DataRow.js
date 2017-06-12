import React from 'react';
import Input from 'components/Input';

export default class DataRow extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { props } = this;
    const { label, type, className } = props;
    const fieldProps = props;
    let rowClass = '';
    let fieldClass = '';

    if (type === 'textarea') {
      rowClass = 'flex-wrap';
      fieldClass = 'x-fill';
    } else {
      fieldClass = 'right-align';
    }

    return (
      <div className={`data-row ${rowClass}${className || ''}`}>
        <label>{label}</label>
        <Input {...fieldProps} fieldClass={fieldClass} />
      </div>
    );
  }
}

DataRow.propTypes = {
};
