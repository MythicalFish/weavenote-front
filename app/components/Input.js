import React from 'react';
import Dropdown from 'components/Dropdown';

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
      fProps.ref = (input) => {
        this.nameInput = input;
      };
    }

    if (p.restricted) {
      fProps.readOnly = true;
    }

    if (p.meta) {
      touched = p.meta.touched;
      error = p.meta.error;
    }

    switch (p.type) {
      case 'display':
        field = (
          <div className="readonly">
            {p.value}
          </div>
        );
        break;
      case 'select':
        if (!fProps.data && p.data) fProps.data = p.data;
        if (p.align) fProps.align = p.align;
        field = <Dropdown {...fProps} />;
        break;
      case 'textarea':
        field = <textarea {...fProps} />;
        break;
      default:
        field = <input {...fProps} type={p.type} />;
        break;
    }

    if (p.type === 'checkbox') {
      return field;
    }

    return (
      <div className={`input ${className}`}>
        {field}
        <div className="focused p0" />
        {touched &&
          error &&
          <span className="error">
            {error}
          </span>}
      </div>
    );
  }
}
