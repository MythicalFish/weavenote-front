import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'components/Dropdown';
import Avatar from 'components/Avatar';
import * as authUtils from 'utils/authUtils';

export default function UserMenu(props) {
  const { user, organization, abilities } = props;
  return (
    <div>
      {user && organization &&
        <Dropdown label={UserMenuButton(user)} width="13">
          <Link to="/profile">Profile</Link>
          {abilities.Organization.update &&
            <Link to="/organization">Organization settings</Link>
          }
          <button onClick={() => { authUtils.logout(); }}>Logout</button>
        </Dropdown>
      }
    </div>
  );
}

const UserMenuButton = (user) => (
  <div className="flex items-center">
    <Avatar {...{ user }} sm />
    <div className="mx1">
      {user.name}
    </div>
    <i className="fa fa-chevron-down dark4 smaller3" />
  </div>
);

UserMenu.propTypes = {
  user: PropTypes.object,
  organization: PropTypes.object,
  abilities: PropTypes.object,
};
