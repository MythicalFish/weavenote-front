import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from './BasicInfo';
import { requestPassword } from '../../actions';
import Button from 'components/Button';

class Settings extends React.PureComponent {
  requestPassword;
  render() {
    const { user, dispatch } = this.props;
    return (
      <div>
        {user &&
          <div>
            <h2>Profile settings</h2>
            <div className="bg-white p2">
              <BasicInfo
                initialValues={user}
                onSubmit={this.props.handleUpdate}
              />
            </div>
            <div className="bg-white p2 mt2">
              <h4>Password</h4>
              <Button
                onclick={dispatch(requestPassword())}
                label="Reset your password"
              />
            </div>
          </div>}
      </div>
    );
  }
}

Settings.propTypes = {
  user: PropTypes.object,
  handleUpdate: PropTypes.func,
  dispatch: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    dispatch: (fn) => () => dispatch(fn),
  };
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(Settings);
