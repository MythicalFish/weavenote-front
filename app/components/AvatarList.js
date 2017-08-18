import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';

const AvatarList = ({ avatars }) =>
  <div className="avatar-list">
    <div className="avatar-list-clipper">
      {avatars &&
        avatars.map((avatar, index) =>
          <Avatar
            key={`avatar${index}`}
            src={avatar.get('url')}
            label={avatar.get('user_name')}
            small
          />
        )}
    </div>
  </div>;

AvatarList.propTypes = {
  avatars: PropTypes.object,
  onClick: PropTypes.func,
};

export default AvatarList;
