import React from 'react';
import onClickOutside from 'react-onclickoutside';

export default function Focusable(Component) {
  class F extends React.PureComponent {
    state = { isFocused: false, action: null };
    handleClickOutside = () => {
      setTimeout(() => {
        if (this.state.isFocused) this.setState({ isFocused: false });
      }, 220);
    };
    render() {
      const { isFocused, action } = this.state;
      const focusClass = isFocused ? 'focused' : '';
      const isDoing = (thing) => isFocused && action === thing;
      const focusThis = () => {
        if (!isFocused) this.setState({ isFocused: true });
      };
      const unfocusThis = () => {
        if (isFocused) this.setState({ isFocused: false });
      };
      const toggleThis = () => {
        if (isFocused) {
          unfocusThis();
        } else {
          focusThis();
        }
      };
      const doThis = (thing) => () => this.setState({ action: thing });
      const doNothing = () => doThis(null);
      return (
        <Component
          {...{
            ...this.props,
            focusThis,
            unfocusThis,
            toggleThis,
            doThis,
            doNothing,
            isFocused,
            isDoing,
            focusClass,
          }}
        />
      );
    }
  }

  return onClickOutside(F);
}
