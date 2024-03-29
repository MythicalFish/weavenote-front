import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';
import Icon from 'components/Icon';
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
      onEnterKey(e.target.value);
      e.preventDefault();
    }
  };
  render() {
    const p = { ...this.props };

    let field = null;
    let fProps;
    let className = '';
    let icon;

    if (p.icon) {
      icon = p.icon;
      delete p.icon;
    }

    if (p.fieldClass) {
      className = p.fieldClass;
      delete p.fieldClass;
    }

    if (p.small) {
      delete p.small;
      className += ' input-sm';
    }

    if (p.input) {
      fProps = { ...p.input };
      if (p.tail) fProps.tail = p.tail;
      if (p.required) fProps.required = p.required;
      if (p.placeholder) fProps.placeholder = p.placeholder;
      if (p.onFocus) fProps.onFocus = p.onFocus;
      if (p.onChanged) fProps.onChanged = p.onChanged;
    } else {
      fProps = { ...p };
    }

    if (fProps.theme) delete fProps.theme;
    if (fProps.focus) delete fProps.focus;

    if (p.focus || p.handleRef) {
      fProps.ref = (input) => {
        this.nameInput = input;
        if (p.handleRef) p.handleRef(input);
      };
      if (p.handleRef) delete fProps.handleRef;
    }

    if (p.readOnly) {
      fProps.readOnly = true;
      fProps.onFocus = null;
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
        {icon && <Icon name={icon.name} size={icon.size} />}
      </div>
    );
  }
}

const fieldConstructor = (props) => {
  const fProps = { ...props };
  if (props.onChange) {
    fProps.onChange = (e) => {
      if (e.persist) e.persist();
      debounce(
        () => {
          props.onChange(e);
        },
        1000,
        this
      )();
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
