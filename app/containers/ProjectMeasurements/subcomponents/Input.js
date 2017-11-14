import React, { PropTypes } from 'react';
import { debounce } from 'utils/misc';

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.focus) this.element.focus();
    this.setColWidth();
  }
  componentDidUpdate = () => {
    this.setInputWidth();
  };
  setColWidth = () => {
    const { colKey } = this.props;
    const { element: e, minSize: min, defaultValue } = this;
    let length = defaultValue;
    if (e) length = e.value.length;
    length = length <= min ? min : length;
    length += 1;
    this.props.setColWidth(colKey, length);
    this.setInputWidth();
  };
  setInputWidth = () => {
    const { colWidth } = this.props;
    const { element: e } = this;
    if (this.shouldChange()) e.size = colWidth;
  };
  shouldChange = () =>
    this.props.colWidth > this.minSize &&
    this.props.colWidth !== this.element.size;
  minSize = 3;
  doUpdate = debounce(() => {
    const { handleChange } = this.props;
    if (handleChange) handleChange(this.state.value);
  }, 1000);
  render() {
    const { defaultValue, maxLength, placeholder, readOnly } = this.props;
    const fProps = {
      placeholder,
      defaultValue,
      readOnly: !!readOnly,
      maxLength: maxLength || 12,
      ref: (f) => (this.element = f),
      onFocus: () => this.element.select(),
      size: this.minSize,
      onChange: (event) => {
        this.setState({ value: event.target.value });
        this.setColWidth();
        this.doUpdate();
      },
    };
    return <input {...fProps} type="text" size={this.minSize} />;
  }
}

Input.propTypes = {
  readOnly: PropTypes.bool,
  focus: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
  setColWidth: PropTypes.func,
  maxLength: PropTypes.number,
  colKey: PropTypes.number,
  colWidth: PropTypes.number,
};

export default Input;
