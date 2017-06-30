import React, { PropTypes } from 'react';
import ListItem from 'components/ListItem';
import RoleTypeSelector from './RoleTypeSelector';

class RolesList extends React.PureComponent {

  removeRole = (role) => (() => {
    const { invitable } = this.props;
    this.props.removeRole({ invitable, role });
  })

  updateRole = (roleType, role) => {
    const { invitable } = this.props;
    this.props.updateRole({ invitable, role, roleType });
  }

  selectedRoleType = (roleTypes, role) => {
    if (!roleTypes) return null;
    const key = roleTypes.findKey((obj) => (
      obj.get('id') === role.get('role_type_id')
    ));
    return roleTypes.get(key);
  }

  render() {
    const { roles } = this.props;
    return (
      <div className="y-max8 y-scroll b1 mt1">
        {roles && roles.map((role, index) => (
          <ListItem key={`role-${index}`}>
            <div>
              {role.getIn(['user', 'email'])}
            </div>
            <div>
              <RoleTypeSelector
                target={role}
                handleChange={this.updateRole}
                selectedRoleType={this.selectedRoleType}
              />
            </div>
            <div className="list-item-controls">
              <button onClick={this.removeRole(role)}>
                <i className="fa fa-close"></i>
              </button>
            </div>
          </ListItem>
        ))}
      </div>
    );
  }
}

RolesList.propTypes = {
  roles: PropTypes.object,
  invitable: PropTypes.object,
  removeRole: PropTypes.func,
  updateRole: PropTypes.func,
};

export default RolesList;
