import React, { PropTypes } from 'react';

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.focus) this.element.focus();
    this.scaleInput();
  }
  minSize = 3;
  handleChange = (event) => {
    const { element } = this;
    console.log(element.value);
    const { onChange } = this.props;
    this.scaleInput();
    if (onChange) onChange(event);
  };
  scaleInput = () => {
    const { element: e, minSize: min } = this;
    let length = e.value.length;
    length = length <= min ? min : length;
    length += 1;
    e.size = length;
  };
  render() {
    const { value } = this.props;
    const i = { ...this.props };
    delete i.onChange;
    delete i.value;
    if (value) i.value = value;
    const fProps = {
      ...i,
      ref: (f) => (this.element = f),
      onFocus: () => this.element.select(),
      placeholder: this.props.placeholder || null,
      onChange: this.handleChange,
    };
    return <input {...fProps} type="text" size={this.minSize} />;
  }
}

Input.propTypes = {
  onChange: PropTypes.func,
  focus: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Input;
