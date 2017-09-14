import React, { PropTypes } from 'react';
import Input from 'components/FormInput';
import Focusable from 'utils/Focusable';

// Keep it a class (otherwise breaks Focusable)
class FormField extends React.PureComponent {
  render() {
    const { label, className, focusClass, theme } = this.props;
    let klass = 'field';
    klass += className ? ` ${className}` : '';
    klass += focusClass ? ` ${focusClass}` : '';
    klass += theme ? ` field-theme-${theme}` : ' field-theme-default';
    return (
      <div className={klass}>
        <label>{label}</label>
        <Input {...this.props} onFocus={this.props.focusThis} />
      </div>
    );
  }
}

FormField.propTypes = {
  label: PropTypes.string,
  focusThis: PropTypes.func,
  className: PropTypes.string,
  focusClass: PropTypes.string,
  theme: PropTypes.string,
};

export default Focusable(FormField);
export { FormField };
