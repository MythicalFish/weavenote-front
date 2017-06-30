import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import UserMenu from 'components/UserMenu';
import { selectUser, selectOrganization, selectAbilities } from 'containers/App/selectors';

class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="flex items-center justify-between p2 bg-white dark8 bb1">
        <div></div>
        <div>
          <UserMenu {...this.props} />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  organization: PropTypes.object,
  abilities: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectUser(),
  organization: selectOrganization(),
  abilities: selectAbilities(),
});

export default connect(mapState, mapDispatch)(Header);
