import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from './BasicInfo';

class Settings extends React.PureComponent {
  render() {
    const { user } = this.props;
    return (
      <div>
        {user &&
          <div>
            <h2 className="mt0">Profile settings</h2>
            <div className="bg-white p2">
              <BasicInfo
                initialValues={user}
                onSubmit={this.props.handleUpdate}
              />
            </div>
            <div className="bg-white p2 mt2">
              <h3>Change your password</h3>
            </div>
          </div>}
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
    dispatch,
  };
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(Settings);
