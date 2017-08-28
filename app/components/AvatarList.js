import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';
import Icon from 'components/Icon';
import sizeMe from 'react-sizeme';

const avatarWidth = 33;

const AvatarList = ({ avatars, size, onClick, showPlusButton }) => {
  const maxWidth = size.width - avatarWidth;
  let usedWidth = 0;
  let hiddenCount = 0;
  const visibleAvatars = [];
  avatars.forEach((avatar, index) => {
    usedWidth += avatarWidth;
    if (usedWidth > maxWidth) {
      hiddenCount += 1;
    } else {
      visibleAvatars.push(
        <Avatar
          key={`avatar${index}`}
          src={avatar.get('url')}
          label={avatar.get('user_name')}
          small
        />
      );
    }
  });
  return (
    <button className="avatar-list" type="button" onClick={onClick}>
      {visibleAvatars}
      {hiddenCount > 0 &&
        <div className="hidden-count flex items-center justify-center">
          +{hiddenCount}
        </div>}
      {hiddenCount === 0 &&
        showPlusButton &&
        <Icon name="UserPlus" size={20} className="ml1" />}
    </button>
  );
};

AvatarList.propTypes = {
  avatars: PropTypes.object,
  size: PropTypes.object,
  onClick: PropTypes.func,
  showPlusButton: PropTypes.bool,
};

export default sizeMe()(AvatarList);
