import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { setFocus } from './actions';
import { selectState } from './selectors';

const randomID = () => Math.random().toString(36).substring(7);

export default function Focusable(Component, focusIndex = 0) {
  class F extends React.PureComponent {
    state = { id: null };
    componentDidMount = () => {
      this.setState({ id: randomID() });
    };
    render() {
      const { id } = this.state;
      const { setFocus: set, state } = this.props;
      const focused = state.get(focusIndex);
      const isFocused = focused.get('id') === id;
      const focusClass = isFocused ? 'focused' : '';
      const isDoing = (action) => isFocused && focused.get('action') === action;
      const focusThis = () => {
        if (!isFocused) set({ focusIndex, id, action: null });
      };
      const unfocusThis = () => set({ focusIndex, id: null, action: null });
      const doThis = (action) => () => set({ focusIndex, id, action });
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
    state: PropTypes.object,
  };

  const mapDispatch = (dispatch) => bindActionCreators({ setFocus }, dispatch);

  const mapState = createStructuredSelector({
    state: selectState(),
  });

  return connect(mapState, mapDispatch)(F);
}
