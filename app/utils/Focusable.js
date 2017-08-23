import React from 'react';
import onClickOutside from 'react-onclickoutside';

/*
  This might look a bit confusing, but basically
  this HOC provides various focus methods, and
  a delay is created in the wrapped component by
  providing isFocused bool, and then focusClass
  220ms later. This is for CSS animation, and to
  give any child events time to execute before
  unmounting (specifically those inside Tether).
*/

export default function Focusable(Component) {
  class F extends React.PureComponent {
    state = { isFocused: false, isActive: false, action: null };
    isTrulyFocused = () => this.state.isFocused && this.state.isActive;
    handleClickOutside = () => this.doUnfocus();
    doUnfocus = () => {
      if (this.isTrulyFocused()) {
        this.setState({ isFocused: false });
        setTimeout(() => this.setState({ isActive: false }), 220);
      }
    };
    render() {
      const { isFocused, isActive, action } = this.state;
      const focusClass = isFocused ? 'focused' : '';
      const isDoing = (thing) => this.isTrulyFocused() && action === thing;
      const focusThis = () => {
        if (!this.isTrulyFocused()) {
          this.setState({ isActive: true });
          setTimeout(() => this.setState({ isFocused: true }), 20);
        }
      };
      const unfocusThis = () => {
        if (this.isTrulyFocused()) {
          this.doUnfocus();
        }
      };
      const toggleThis = () => {
        if (this.isTrulyFocused()) {
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
            isFocused: isActive,
            isDoing,
            focusClass,
          }}
        />
      );
    }
  }

  return onClickOutside(F);
}
