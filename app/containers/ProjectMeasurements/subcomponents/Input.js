import React, { PropTypes } from 'react';
import { debounce } from 'utils/misc';

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.focus) this.element.focus();
    this.scaleInput();
  }
  doUpdate = debounce(() => {
    const { handleChange } = this.props;
    if (handleChange) handleChange(this.state.value);
  }, 1000);
  minSize = 3;
  scaleInput = () => {
    const { element: e, minSize: min } = this;
    let length = e.value.length;
    length = length <= min ? min : length;
    length += 1;
    e.size = length;
  };
  render() {
    const { defaultValue, maxLength, placeholder } = this.props;
    const fProps = {
      placeholder,
      defaultValue,
      maxLength: maxLength || 12,
      ref: (f) => (this.element = f),
      onFocus: () => this.element.select(),
      onChange: (event) => {
        this.setState({ value: event.target.value });
        this.doUpdate();
      },
    };
    return <input {...fProps} type="text" size={this.minSize} />;
  }
}

Input.propTypes = {
  focus: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
  maxLength: PropTypes.number,
};

export default Input;
