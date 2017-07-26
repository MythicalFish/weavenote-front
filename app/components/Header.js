import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import UserMenu from 'components/UserMenu';
import {
  selectUser,
  selectOrganization,
  selectAbilities,
} from 'containers/App/selectors';

function Header(props) {
  return (
    <div className="flex items-center justify-between p2 bg-white dark8 bb1 blurrable">
      <div />
      <div>
        <UserMenu {...props} />
      </div>
    </div>
  );
}

const mapState = createStructuredSelector({
  user: selectUser(),
  organization: selectOrganization(),
  abilities: selectAbilities(),
});

export default connect(mapState)(Header);
