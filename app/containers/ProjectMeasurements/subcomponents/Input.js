import React, { PropTypes } from 'react';

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.focus && this.element) {
      this.element.focus();
    }
  }
  render() {
    const { input, maxLength } = this.props;
    const fProps = {
      ...input,
      maxLength: maxLength || 10,
      ref: (f) => {
        this.element = f;
      },
      onFocus: () => this.element.select(),
      placeholder: this.props.placeholder || null,
    };
    return <input {...fProps} type="text" />;
  }
}

Input.propTypes = {
  input: PropTypes.object,
  focus: PropTypes.bool,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
};

export default Input;
