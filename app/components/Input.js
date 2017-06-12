import React, { PropTypes } from 'react';
import SelectInput from 'components/SelectInput';

export default class Input extends React.PureComponent {

  componentDidMount() {
    if (this.props.focus) {
      this.nameInput.focus();
    }
  }

  render() {

    const { props } = this;
    let field = null;
    let touched = false;
    let error = false;
    let fieldProps;
    const className = props.fieldClass || '';

    if (props.input) {
      fieldProps = props.input;
      if (props.onChanged) {
        fieldProps.onChanged = props.onChanged; // onChange in use by redux-form
      }
      if (props.tail) {
        fieldProps.tail = props.tail;
      }
    } else {
      fieldProps = props;
    }

    if (props.focus) {
      fieldProps.ref = (input) => { this.nameInput = input; };
    }

    if (props.noEdit) {
      fieldProps.readOnly = true;
    }

    if (props.required) {
      fieldProps.required = true;
    }

    if (props.meta) {
      touched = props.meta.touched;
      error = props.meta.error;
    }

    if (props.type === 'select') {
      if (!fieldProps.data && props.data) {
        fieldProps.data = props.data;
      }
    }

    switch (props.type) {
      case 'display':
        field = <div className="readonly">{props.value}</div>;
        break;
      case 'select':
        field = <SelectInput {...fieldProps} />;
        break;
      case 'textarea':
        field = <textarea {...fieldProps} />;
        break;
      default:
        field = <input {...fieldProps} type={props.type} />;
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

Input.propTypes = {
  focus: PropTypes.bool,
  value: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};
