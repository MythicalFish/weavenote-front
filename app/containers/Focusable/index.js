import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { setFocus } from './actions';
import { selectFocused } from './selectors';

const randomID = () => Math.random().toString(36).substring(7);

export default function Focusable(Component) {
  class F extends React.PureComponent {
    state = { id: null };
    componentDidMount = () => {
      this.setState({ id: randomID() });
    };
    render() {
      const { id } = this.state;
      const { setFocus: set, focused } = this.props;
      const isFocused = focused.get('id') === id;
      const focusClass = isFocused ? 'focused' : '';
      const isDoing = (action) => isFocused && focused.get('action') === action;
      const focusThis = () => {
        if (!isFocused) set({ id, action: null });
      };
      const unfocusThis = () => set({ id: null, action: null });
      const doThis = (action) => () => set({ id, action });
      return (
        <Component
          {...{
            ...this.props,
            focusThis,
            unfocusThis,
            doThis,
            isFocused,
            isDoing,
            focusClass,
          }}
        />
      );
    }
  }

  F.propTypes = {
    setFocus: PropTypes.func,
    focused: PropTypes.object,
  };

  const mapDispatch = (dispatch) => bindActionCreators({ setFocus }, dispatch);

  const mapState = createStructuredSelector({
    focused: selectFocused(),
  });

  return connect(mapState, mapDispatch)(F);
}
