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

export default function Focusable(Component, opts = {}) {
  class F extends React.PureComponent {
    state = { isFocused: false, isActive: false, action: null };
    isTrulyFocused = () => this.state.isFocused && this.state.isActive;
    handleClickOutside = () => {
      if (!opts.disableOutside) this.unfocusThis();
    };
    unfocusThis = () => {
      const { afterLoseFocus } = this.props;
      return new Promise((resolve) => {
        if (this.isTrulyFocused()) {
          this.setState({ isFocused: false });
          setTimeout(() => {
            this.setState({ isActive: false });
            resolve();
            if (afterLoseFocus) afterLoseFocus();
          }, 320);
        }
      });
    };
    focusThis = () => {
      if (!this.isTrulyFocused()) {
        this.setState({ isActive: true });
        setTimeout(() => this.setState({ isFocused: true }), 20);
      }
    };
    render() {
      const { isFocused, isActive, action } = this.state;
      const focusClass = isFocused ? 'focused' : '';
      const isDoing = (thing) => isActive && action === thing;
      const { unfocusThis, focusThis } = this;
      const toggleThis = () =>
        this.isTrulyFocused() ? unfocusThis() : focusThis();
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
