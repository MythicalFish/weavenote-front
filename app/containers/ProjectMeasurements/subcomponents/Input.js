import React, { PropTypes } from 'react';

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.focus) this.element.focus();
    this.scaleInput();
  }
  handleChange = (event) => {
    const { input } = this.props;
    this.scaleInput();
    input.onChange(event);
  };
  scaleInput = () => {
    const { element: e } = this;
    let length = e.value.length;
    length = length > 1 ? length : 1;
    e.style.width = `${length * 20}px`;
  };
  render() {
    const { input, maxLength } = this.props;
    const i = { ...input };
    delete i.onChange;
    const fProps = {
      ...i,
      maxLength: maxLength || 10,
      ref: (f) => {
        this.element = f;
      },
      onFocus: () => this.element.select(),
      placeholder: this.props.placeholder || null,
      onChange: this.handleChange,
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
