import React from 'react';
import onClickOutside from 'react-onclickoutside';

/*
  This might look a bit confusing, but basically
  this HOC provides various focus methods, and
  a delay is created in the wrapped component by
  providing isFocused bool, and then focusClass
  320ms later. This is for CSS animation, and to
  give any child events time to execute before
  unmounting (specifically those inside Tether).
*/

class FocusPseudo extends React.PureComponent {
  // This Component allows componentIsMounted (below)
  // to work (it doesn't if the wrapped component is
  // a pure function).
  render() {
    const { Component } = this.props;
    return <Component {...this.props} />;
  }
}

export default function F(Component, opts = {}) {
  class Focusable extends React.PureComponent {
    state = { isFocused: false, isActive: false, action: null };
    isTrulyFocused = () => this.state.isFocused && this.state.isActive;
    handleClickOutside = () => {
      if (!opts.disableOutside) this.unfocusThis();
    };
    unfocusThis = () => {
      const delay = opts.delay >= 0 ? opts.delay : 320;
      setTimeout(() => {
        if (this.componentIsMounted) {
          if (this.isTrulyFocused()) {
            this.setState({ isFocused: false });
            setTimeout(() => {
              if (this.componentIsMounted) this.setState({ isActive: false });
            }, delay);
          }
        }
      }, 200);
    };
    focusThis = () => {
      if (!this.isTrulyFocused()) {
        this.setState({ isActive: true });
        setTimeout(() => this.setState({ isFocused: true }), 20);
      }
    };
    toggleThis = () =>
      this.isTrulyFocused() ? this.unfocusThis() : this.focusThis();
    render() {
      const { isFocused, isActive, action } = this.state;
      const focusClass = isFocused ? 'focused' : '';
      const isDoing = (thing) => isActive && action === thing;
      const { unfocusThis, focusThis, toggleThis } = this;
      const doThis = (thing) => () => this.setState({ action: thing });
      const doNothing = () => doThis(null);
      return (
        <FocusPseudo
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
            Component,
            ref: (ref) => {
              this.componentIsMounted = !!ref;
            },
          }}
        />
      );
    }
  }

  return onClickOutside(Focusable);
}
