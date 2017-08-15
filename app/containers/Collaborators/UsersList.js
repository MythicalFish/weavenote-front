import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'components/Avatar';
import { openModal } from 'containers/App/actions';

const UsersList = ({ users }) =>
  <div>
    {users && users.map((user, index) => <div>u</div>)}
  </div>;

UsersList.propTypes = {
  users: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      openModal,
    },
    dispatch
  );
}

export default connect(null, mapDispatch)(UsersList);
