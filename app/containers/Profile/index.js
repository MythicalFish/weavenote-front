import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Form from './subcomponents/Form';
import { updateUser } from './actions';

class Profile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Form
          initialValues={user}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { updateUser },
    dispatch
  );
}

const mapState = createStructuredSelector({
});

export default connect(mapState, mapDispatch)(Profile);
