import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'components/Dropdown';
import Avatar from 'components/Avatar';
import * as authUtils from 'utils/authUtils';
import Icon from 'components/Icon';

export default function UserMenu(props) {
  const { user } = props;
  const MenuItem = (p) =>
    <div className="flex items-center">
      <div className="flex-auto">
        {p.label}
      </div>
      <Icon name={p.icon} size={16} className="ml1 flex-none" />
    </div>;
  return (
    <div>
      {user &&
        <Dropdown label={UserMenuButton(props)} align="right">
          <Link to="/profile">
            <MenuItem icon="User" label="Profile" />
          </Link>
          <Link to="/organization">
            <MenuItem icon="Users" label="Organization" />
          </Link>
          <button onClick={authUtils.logout}>
            <MenuItem icon="LogOut" label="Logout" />
          </button>
        </Dropdown>}
    </div>
  );
}

const UserMenuButton = (props) => {
  const { user, organization } = props;
  return (
    <div className="flex items-center">
      <div className="mx1 right-align">
        {user.get('name')}
        {organization &&
          <div className="dark5 upcase smaller1">
            {organization.get('name')}
          </div>}
      </div>
      <Avatar {...{ user }} />
      <Icon name="ChevronDown" size={20} className="ml1" />
    </div>
  );
};

UserMenuButton.propTypes = {
  user: PropTypes.object,
  organization: PropTypes.object,
};

UserMenu.propTypes = {
  user: PropTypes.object,
  abilities: PropTypes.object,
};
