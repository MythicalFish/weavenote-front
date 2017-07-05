import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'components/Dropdown';
import Avatar from 'components/Avatar';
import * as authUtils from 'utils/authUtils';

export default function UserMenu(props) {
  const { user, abilities } = props;
  return (
    <div>
      {user &&
        <Dropdown label={UserMenuButton(props)} className="right-align">
          <Link to="/profile">
            Profile
            <i className="fa fa-user ml1" />
          </Link>
          <Link to="/organization">
            Organization
            <i className="fa fa-group ml1" />
          </Link>
          <button
            onClick={() => {
              authUtils.logout();
            }}
          >
            Logout
            <i className="fa fa-eject ml1" />
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
      <i className="fa fa-chevron-down dark4 smaller3 ml1" />
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
