/*
 *
 * Contacts
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectContacts from './selectors';

export class Contacts extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    );
  }
}

Contacts.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapState = createStructuredSelector({
  Contacts: makeSelectContacts(),
});

function mapDispatch(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapState, mapDispatch)(Contacts);
