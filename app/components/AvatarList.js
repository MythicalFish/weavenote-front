import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';

const AvatarList = ({ users }) =>
  <div>
    {users && users.map((user, index) => <div>u</div>)}
  </div>;

AvatarList.propTypes = {
  users: PropTypes.object,
  onClick: PropTypes.func,
};

export default AvatarList;
