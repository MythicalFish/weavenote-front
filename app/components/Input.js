import React, { PropTypes } from 'react';
import SelectInput from 'components/SelectInput';

export default class Input extends React.PureComponent {

  componentDidMount() {
    if (this.props.focus) {
      this.nameInput.focus();
    }
  }

  render() {

    const p = this.props;
    let field = null;
    let touched = false;
    let error = false;
    let fProps;
    let className = p.fieldClass || '';
    
    if (p.sm) {
      className += 'input-sm';
    }

    if (p.input) {
      fProps = p.input;
      if (p.onChanged) fProps.onChanged = p.onChanged; // onChange in use by redux-form
      if (p.tail) fProps.tail = p.tail;
      if (p.required) fProps.required = p.required;
      if (p.placeholder) fProps.placeholder = p.placeholder;
    } else {
      fProps = p;
    }

    if (p.focus) {
      fProps.ref = (input) => { this.nameInput = input; };
    }

    if (p.noEdit) {
      fProps.readOnly = true;
    }

    if (p.meta) {
      touched = p.meta.touched;
      error = p.meta.error;
    }

    if (p.type === 'select') {
      if (!fProps.data && p.data) {
        fProps.data = p.data;
      }
    }

    switch (p.type) {
      case 'display':
        field = <div className="readonly">{p.value}</div>;
        break;
      case 'select':
        field = <SelectInput {...fProps} />;
        break;
      case 'textarea':
        field = <textarea {...fProps} />;
        break;
      default:
        field = <input {...fProps} type={p.type} />;
        break;
    }

    return (
      <div className={`input ${className}`}>
        {field}
        <div className="focused p0"></div>
        {touched && error && <span className="error">{error}</span>}
      </div>
    );
  }
}

