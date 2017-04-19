/*
 *
 * Auth
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AuthService from 'utils/AuthService';
import { startAuth } from './actions';
//import makeSelectAuth from './selectors';


export class Auth extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.startAuth();
  }
  render() {
    const { auth } = this.props;
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Auth.propTypes = {
  children: React.PropTypes.element.isRequired,
  startAuth: React.PropTypes.func,
  auth: React.PropTypes.instanceOf(AuthService),
};

const mapStateToProps = createStructuredSelector({
  //Auth: makeSelectAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
    startAuth: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(startAuth());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
