import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectGlobalData } from 'containers/App/selectors';
import InviteForm from './subcomponents/InviteForm';
import InviteList from './subcomponents/InviteList';
import RoleList from './subcomponents/RoleList';
import {
  fetchInvites,
  cancelInvite,
  updateInvite,
  fetchRoles,
  removeRole,
  updateRole,
} from './actions';
import { selectInvites, selectRoles } from './selectors';

class Collaborators extends React.Component {
  componentDidMount() {
    const p = this.props;
    p.fetchInvites(p.invitable);
    p.fetchRoles(p.invitable);
  }

  render() {
    if (!this.props.globalData) return null;
    const { invitable, invites, roles, globalData: { roleTypes } } = this.props;
    const rProps = { ...this.props, roleTypes };
    return (
      <div>
        {roles.size > 0 && (
          <div className="p2">
            <RoleList {...rProps} />
          </div>
        )}
        {invites.size > 0 && (
          <div className="bt1 p2">
            Pending invitations
            <InviteList {...rProps} />
          </div>
        )}
        <footer className="bt1 p2">
          <InviteForm
            initialValues={{
              invitable,
            }}
          />
        </footer>
      </div>
    );
  }
}

Collaborators.propTypes = {
  globalData: PropTypes.object,
  invites: PropTypes.object,
  invitable: PropTypes.object,
  roles: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchInvites,
      updateInvite,
      cancelInvite,
      fetchRoles,
      updateRole,
      removeRole,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  invites: selectInvites(),
  roles: selectRoles(),
  globalData: selectGlobalData(),
});

export default connect(mapState, mapDispatch)(Collaborators);
