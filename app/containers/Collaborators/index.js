import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import InviteForm from './partials/InviteForm';
import InviteList from './partials/InviteList';
import RoleList from './partials/RoleList';
import {
  fetchInvites, cancelInvite, updateInvite, fetchRoles, removeRole, updateRole,
} from './actions';
import { selectInvites, selectRoles } from './selectors';

class Collaborators extends React.Component {

  componentDidMount() {
    const p = this.props;
    p.fetchInvites(p.invitable);
    p.fetchRoles(p.invitable);
  }

  render() {
    const { invitable, invites, roles } = this.props;
    return (
      <div>
        <header>Collaborators</header>
        {roles.size > 0 &&
          <div className="p2">
            <RoleList {...this.props} />
          </div>
        }
        {invites.size > 0 &&
          <div className="bt1 p2">
            Pending invitations
            <InviteList {...this.props} />
          </div>
        }
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
});

export default connect(mapState, mapDispatch)(Collaborators);
