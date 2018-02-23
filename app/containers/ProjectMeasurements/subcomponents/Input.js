import React, { PropTypes } from 'react';
import { debounce } from 'utils/misc';

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.focus) this.element.focus();
    this.setColWidth();
  }
  componentDidUpdate = () => {
    this.setColWidth();
  };
  setColWidth = () => {
    const { element, minSize } = this;
    const { colKey, defaultValue, colWidth } = this.props;
    let length = defaultValue;
    if (element) length = element.value.length;
    length = minSize > length ? minSize : length;
    length += 1;
    if (colWidth === length) return;
    this.props.setColWidth(colKey, length);
  };
  minSize = 3;
  doUpdate = debounce(
    () => {
      const { handleChange } = this.props;
      if (handleChange) handleChange(this.state.value);
    },
    1000,
    this
  );
  render() {
    const {
      defaultValue,
      maxLength,
      placeholder,
      readOnly,
      colWidth,
    } = this.props;
    const fProps = {
      type: 'text',
      placeholder,
      defaultValue,
      readOnly: !!readOnly,
      maxLength: maxLength || 12,
      ref: (f) => (this.element = f),
      onFocus: () => this.element.select(),
      size: colWidth || this.minSize,
      onChange: (event) => {
        this.setState({ value: event.target.value });
        this.setColWidth();
        this.doUpdate();
      },
    };
    return <input {...fProps} />;
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
  colKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  colWidth: PropTypes.number,
};

export default Input;
