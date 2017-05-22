import React, { PropTypes } from 'react';
import SelectInput from 'components/SelectInput';

export default class DataRow extends React.PureComponent {

  componentDidMount() {
    if (this.props.focus) {
      this.nameInput.focus();
    }
  }

  render() {

    const { props } = this;
    const { label, type } = props;
    let field = null;
    let touched = false;
    let error = false;
    let rowClass = '';
    let fieldProps;

    if (props.input) {
      fieldProps = props.input;
      if (props.onChanged) {
        fieldProps.onChanged = props.onChanged; // onChange in use by redux-form
      }
    } else {
      fieldProps = props;
    }

    if (props.focus) {
      fieldProps.ref = (input) => { this.nameInput = input; };
    }

    if (props.meta) {
      touched = props.meta.touched;
      error = props.meta.error;
    }

    switch (type) {
      case 'display':
        field = <div className="right-align">{props.value}</div>;
        break;
      case 'select':
        field = <SelectInput {...fieldProps} data={props.data} className="right-align" />;
        break;
      case 'textarea':
        field = <textarea {...fieldProps} />;
        rowClass = 'flex-wrap';
        break;
      default:
        field = <input {...fieldProps} type={type} className="right-align" />;
        break;
    }

    return (
      <div className={`data-row ${rowClass}`}>
        <label>{label}</label>
        {field}
        <div className="focused p0"></div>
        {touched && error && <span className="error">{error}</span>}
      </div>
    );
  }
}

DataRow.propTypes = {
  focus: PropTypes.bool,
  value: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};
