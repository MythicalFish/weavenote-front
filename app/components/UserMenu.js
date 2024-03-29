import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import Dropdown from 'components/Dropdown';
import Avatar from 'components/Avatar';
import * as authUtils from 'utils/authUtils';
import Icon from 'components/Icon';
import { selectUser, selectOrganization } from 'containers/App/selectors';
import { billingURL } from '../utils/misc';

const UserMenu = (props) => {
  if (!props.user) return null;
  return (
    <Dropdown
      label={UserMenuButton(props)}
      align="right"
      className="px3 smaller1 flex items-center"
    >
      <Link to="/profile">
        <MenuItem icon="User" label="Profile" />
      </Link>
      <Link to="/organization">
        <MenuItem icon="Users" label="Organization" />
      </Link>
      {props.user.getIn(['role_type', 'name']) === 'Admin' && (
        <a href={billingURL()}>
          <MenuItem icon="CreditCard" label="Billing" />
        </a>
      )}
      <button onClick={authUtils.logout}>
        <MenuItem icon="LogOut" label="Logout" />
      </button>
    </Dropdown>
  );
};

const MenuItem = (p) => (
  <div className="flex items-center">
    <div className="flex-auto">{p.label}</div>
    <Icon name={p.icon} size={16} className="ml1 flex-none" />
  </div>
);

const UserMenuButton = ({ user, organization }) => (
  <div className="flex items-center">
    <Avatar {...{ user }} />
  </div>
);

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
