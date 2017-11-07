import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';
import { Field } from 'redux-form/immutable';
import { debounce } from 'utils/misc';

class Input extends React.PureComponent {
  static propTypes = {
    focus: PropTypes.bool,
    readOnly: PropTypes.bool,
    onEnterKey: PropTypes.func,
  };
  componentDidMount() {
    const { focus, readOnly } = this.props;
    if (focus && !readOnly) {
      this.nameInput.focus();
    }
  }
  handleKeyPress = (target, e) => {
    const { onEnterKey } = this.props;
    if (onEnterKey && target.charCode === 13 && !target.shiftKey) {
      onEnterKey();
      e.preventDefault();
    }
  };
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
      if (p.tail) fProps.tail = p.tail;
      if (p.required) fProps.required = p.required;
      if (p.placeholder) fProps.placeholder = p.placeholder;
      if (p.onFocus) fProps.onFocus = p.onFocus;
      if (p.onChanged) fProps.onChanged = p.onChanged;
    } else {
      fProps = p;
    }

    if (p.focus) {
      fProps.ref = (input) => {
        this.nameInput = input;
      };
    }

    if (p.readOnly) {
      fProps.readOnly = true;
      fProps.onFocus = null;
    }

    if (p.meta) {
      touched = p.meta.touched;
      error = p.meta.error;
    }

    const type = p.type || 'text';

    switch (type) {
      case 'display':
        field = <div className="readonly">{p.value}</div>;
        break;
      case 'select':
        if (!fProps.data && p.data) fProps.data = p.data;
        if (p.align) fProps.align = p.align;
        field = <Dropdown {...fProps} matchWidth />;
        break;
      case 'textarea':
        field = <textarea {...fProps} onKeyPress={this.handleKeyPress} />;
        break;
      default:
        field = <input {...fProps} type={type} />;
        break;
    }

    if (p.type === 'checkbox') {
      return field;
    }

    return (
      <div className={`input ${className}`}>
        {field}
        {touched && error && <span className="error">{error}</span>}
      </div>
    );
  }
}

const fieldConstructor = (props) => {
  const fProps = { ...props };
  if (props.onChange) {
    fProps.onChange = (e) => {
      if (e.persist) e.persist();
      debounce((...args) => props.onChange(...args), 1000, e)();
    };
  }
  if (props.disableReduxForm) {
    delete fProps.disableReduxForm;
    return <Input {...fProps} />;
  } else {
    return <Field component={Input} {...fProps} />;
  }
};

fieldConstructor.propTypes = {
  onChange: PropTypes.func,
  disableReduxForm: PropTypes.bool,
};

export default fieldConstructor;
