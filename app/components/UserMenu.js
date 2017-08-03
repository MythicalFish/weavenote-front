import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import Dropdown from 'components/Dropdown';
import Avatar from 'components/Avatar';
import * as authUtils from 'utils/authUtils';
import Icon from 'components/Icon';
import { selectUser, selectOrganization } from 'containers/App/selectors';

const UserMenu = (props) => {
  if (!props.user) return null;
  return (
    <Dropdown
      label={UserMenuButton(props)}
      align="right"
      className="px2 smaller1 flex items-center"
    >
      <Link to="/profile">
        <MenuItem icon="User" label="Profile" />
      </Link>
      <Link to="/organization">
        <MenuItem icon="Users" label="Organization" />
      </Link>
      <button onClick={authUtils.logout}>
        <MenuItem icon="LogOut" label="Logout" />
      </button>
    </Dropdown>
  );
};

const MenuItem = (p) =>
  <div className="flex items-center">
    <div className="flex-auto">
      {p.label}
    </div>
    <Icon name={p.icon} size={16} className="ml1 flex-none" />
  </div>;

const UserMenuButton = ({ user, organization }) =>
  <div className="flex">
    <div className="mr1 right-align">
      {user.get('name')}
      {organization &&
        <div className="dark5 upcase smaller1">
          {organization.get('name')}
        </div>}
    </div>
    <Avatar {...{ user }} />
  </div>;

UserMenuButton.propTypes = {
  user: PropTypes.object,
  organization: PropTypes.object,
};

UserMenu.propTypes = {
  user: PropTypes.object,
};

const mapState = createStructuredSelector({
  user: selectUser(),
  organization: selectOrganization(),
});

export default connect(mapState)(UserMenu);
