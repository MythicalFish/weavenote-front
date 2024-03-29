import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';
import Icon from 'components/Icon';
import sizeMe from 'react-sizeme';

import dashImg from '../images/dash.svg';

const avatarWidth = 33;

const AvatarList = (props) => {
  const {
    user,
    collaborators,
    size,
    showPlusButton,
    readOnly,
    showSelf,
  } = props;
  let klass = 'avatar-list';
  if (readOnly) klass += ' readonly';
  const onClick = readOnly ? null : props.onClick;
  const maxWidth = size.width - avatarWidth;
  let usedWidth = 0;
  let hiddenCount = 0;
  const visibleAvatars = [];
  collaborators.forEach((collaborator, index) => {
    if (!showSelf && collaborator.get('id') === user.get('id')) return;
    usedWidth += avatarWidth;
    if (usedWidth > maxWidth) {
      hiddenCount += 1;
    } else {
      visibleAvatars.push(
        <Avatar
          key={`avatar${index}`}
          src={collaborator.get('avatar_src')}
          label={collaborator.get('name')}
          small
        />
      );
    }
  });
  return (
    <button className={klass} type="button" onClick={onClick}>
      {visibleAvatars}
      {hiddenCount > 0 && (
        <div className="hidden-count flex-centered" style={{ backgroundImage: `url(${dashImg})` }}>+{hiddenCount}</div>
      )}
      {hiddenCount === 0 &&
        showPlusButton && (
          <Icon name="UserPlus" size={20} className="ml1" color="dark5" />
        )}
    </button>
  );
};

AvatarList.defaultProps = {
  showSelf: false,
};

AvatarList.propTypes = {
  user: PropTypes.object,
  collaborators: PropTypes.object,
  showSelf: PropTypes.bool,
  size: PropTypes.object,
  onClick: PropTypes.func,
  showPlusButton: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default sizeMe()(AvatarList);
