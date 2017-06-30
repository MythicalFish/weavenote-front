import React, { PropTypes } from 'react';
import ListItem from 'components/ListItem';
import RoleTypeSelector from './RoleTypeSelector';

class InvitesList extends React.PureComponent {

  cancelInvite = (invite) => (() => {
    const { invitable } = this.props;
    this.props.cancelInvite({ invitable, invite });
  })

  updateInvite = (roleType, invite) => {
    const { invitable } = this.props;
    this.props.updateInvite({ invitable, invite, roleType });
  }

  selectedRoleType = (roleTypes, invite) => {
    if (!roleTypes) return null;
    const key = roleTypes.findKey((obj) => (
      obj.get('id') === invite.get('role_type_id')
    ));
    return roleTypes.get(key);
  }

  render() {
    const { invites } = this.props;
    return (
      <div className="y-max8 y-scroll b1 mt1">
        {invites && invites.map((invite, index) => (
          <ListItem key={`invite-${index}`}>
            <div>
              {invite.get('email')}
            </div>
            <div>
              <RoleTypeSelector
                target={invite}
                handleChange={this.updateInvite}
                selectedRoleType={this.selectedRoleType}
              />
            </div>
            <div className="list-item-controls">
              <button onClick={this.cancelInvite(invite)}>
                <i className="fa fa-close"></i>
              </button>
            </div>
          </ListItem>
        ))}
      </div>
    );
  }
}

InvitesList.propTypes = {
  invites: PropTypes.object,
  invitable: PropTypes.object,
  cancelInvite: PropTypes.func,
  updateInvite: PropTypes.func,
};

export default InvitesList;
