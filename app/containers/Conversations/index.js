/*
 *
 * Conversations
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectConversations from './selectors';

export class Conversations extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    );
  }
}

Conversations.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapState = createStructuredSelector({
  Conversations: makeSelectConversations(),
});

function mapDispatch(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapState, mapDispatch)(Conversations);
