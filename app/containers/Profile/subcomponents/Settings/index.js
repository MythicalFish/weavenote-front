import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Form from './Form';
import { updateProfile } from '../../actions';

class Settings extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user } = this.props;
    return (
      <div>
        {user &&
          <div>
            <h2 className="mt0">
              Profile settings
            </h2>
            <div className="bg-white p2">
              <Form
                initialValues={user}
                onSubmit={this.props.handleUpdate}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

Settings.propTypes = {
  user: PropTypes.object,
  handleUpdate: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    handleUpdate: (data) => {
      dispatch(updateProfile(data));
    },
    dispatch,
  };
}

const mapState = createStructuredSelector({
});

export default connect(mapState, mapDispatch)(Settings);
