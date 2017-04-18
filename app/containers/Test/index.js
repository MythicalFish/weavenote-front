/*
 *
 * Test
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectTest from './selectors';

export class Test extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {                      console.log('componentWillMount'); }
  componentDidMount() {                       console.log('componentDidMount'); }
  componentWillReceiveProps(newProps) {       console.log('componentWillReceiveProps'); }
  shouldComponentUpdate(newProps, newState) { console.log('shouldComponentUpdate'); return true; }
  componentWillUpdate(nextProps, nextState) { console.log('componentWillUpdate'); }
  componentDidUpdate(prevProps, prevState) {  console.log('componentDidUpdate'); }
  componentWillUnmount() {                    console.log('componentWillUnmount'); }

  render() {
    return (
      <div>
        This is a test component  
      </div>
    );
  }
}

Test.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Test: makeSelectTest(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
