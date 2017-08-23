import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { setFocus } from './actions';
import { selectState } from './selectors';

const randomID = () => Math.random().toString(36).substring(7);

export default function Focusable(Component) {
  class F extends React.PureComponent {
    state = { id: null };
    componentDidMount = () => {
      this.setState({ id: randomID() });
    };
    getFocusIndex = () => this.props.focusIndex || 0;
    globalFocus = () => this.props.globalFocus.get(this.getFocusIndex());
    render() {
      const focusIndex = this.getFocusIndex();
      const { id } = this.state;
      const { setFocus: set } = this.props;
      const focused = this.globalFocus();
      const isFocused = focused && focused.get('id') === id;
      const focusClass = isFocused ? 'focused' : '';
      const isDoing = (action) => isFocused && focused.get('action') === action;
      const focusThis = () => {
        if (!isFocused) set({ focusIndex, id, action: null });
      };
      const unfocusThis = () => {
        if (isFocused) set({ focusIndex, id: null, action: null });
      };
      const toggleThis = () => {
        if (isFocused) {
          unfocusThis();
        } else {
          focusThis();
        }
      };
      const doThis = (action) => () => set({ focusIndex, id, action });
      return (
        <Component
          {...{
            ...this.props,
            focusThis,
            unfocusThis,
            toggleThis,
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
    globalFocus: PropTypes.object,
    focusIndex: PropTypes.number,
  };

  const mapDispatch = (dispatch) => bindActionCreators({ setFocus }, dispatch);

  const mapState = createStructuredSelector({
    globalFocus: selectState(),
  });

  return connect(mapState, mapDispatch)(F);
}
