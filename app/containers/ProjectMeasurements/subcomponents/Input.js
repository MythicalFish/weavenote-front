import React, { PropTypes } from 'react';

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.focus) {
      this.nameInput.focus();
    }
  }
  render() {
    const { input, focus, maxLength } = this.props;
    const fProps = { ...input, maxLength: maxLength || 10 };
    if (focus) {
      fProps.ref = (f) => {
        this.nameInput = f;
      };
    }
    return <input {...fProps} type="text" />;
  }
}

Input.propTypes = {
  input: PropTypes.object,
  focus: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default Input;
