/*
 *
 * Materials
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectMaterials from './selectors';

export class Materials extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    );
  }
}

Materials.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapState = createStructuredSelector({
  Materials: makeSelectMaterials(),
});

function mapDispatch(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapState, mapDispatch)(Materials);
