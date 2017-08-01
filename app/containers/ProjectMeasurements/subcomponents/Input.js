import React, { PropTypes } from 'react';

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.focus) {
      this.nameInput.focus();
    }
  }
  render() {
    const { input, focus } = this.props;
    const fProps = { ...input };
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
};

export default Input;
