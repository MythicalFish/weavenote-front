import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { doFocus } from './actions';
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
      const { focus, focused } = this.props;
      const isFocused = focused.id === id;
      const focusThis = () => focus(id);
      const unfocusThis = () => focus(null);
      return (
        <Component {...{ ...this.props, focusThis, unfocusThis, isFocused }} />
      );
    }
  }

  F.propTypes = {
    focus: PropTypes.func,
    focused: PropTypes.object,
  };

  const mapDispatch = (dispatch) =>
    bindActionCreators({ focus: doFocus }, dispatch);

  const mapState = createStructuredSelector({
    focused: selectFocused(),
  });

  return connect(mapState, mapDispatch)(F);
}
