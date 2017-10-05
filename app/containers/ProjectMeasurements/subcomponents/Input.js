import React, { PropTypes } from 'react';

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.focus) this.element.focus();
    this.scaleInput();
  }
  minSize = 3;
  handleChange = (event) => {
    const { input } = this.props;
    this.scaleInput();
    input.onChange(event);
  };
  scaleInput = () => {
    const { element: e, minSize: min } = this;
    let length = e.value.length;
    length = length <= min ? min : length;
    length += 1;
    e.size = length;
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
    return <input {...fProps} type="text" size={this.minSize} />;
  }
}

Input.propTypes = {
  input: PropTypes.object,
  focus: PropTypes.bool,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
};

export default Input;
