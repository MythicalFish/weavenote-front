import React, { PropTypes } from 'react';
import ListItem from 'components/ListItem';
import RoleSelector from './RoleSelector';

class CollaboratorsList extends React.PureComponent {

  removeCollaborator = (collaborator) => (() => {
    const { invitable } = this.props;
    this.props.removeCollaborator({ invitable, collaborator });
  })

  updateCollaborator = (roleType, collaborator) => {
    const { invitable } = this.props;
    this.props.updateCollaborator({ invitable, collaborator, roleType });
  }

  selectedRoleType = (roleTypes, collaborator) => {
    if (!roleTypes) return null;
    const key = roleTypes.findKey((obj) => (
      obj.get('id') === collaborator.get('role_type_id')
    ));
    return roleTypes.get(key);
  }

  render() {
    const { collaborators } = this.props;
    return (
      <div className="y-max8 y-scroll b1 mt1">
        {collaborators && collaborators.map((collaborator, index) => (
          <ListItem key={`collaborator-${index}`}>
            <div>
              {collaborator.get('email')}
            </div>
            <div>
              <RoleSelector
                target={collaborator}
                handleChange={this.updateCollaborator}
                selectedRoleType={this.selectedRoleType}
              />
            </div>
            <div className="list-item-controls">
              <button onClick={this.removeCollaborator(collaborator)}>
                <i className="fa fa-close"></i>
              </button>
            </div>
          </ListItem>
        ))}
      </div>
    );
  }
}

CollaboratorsList.propTypes = {
  collaborators: PropTypes.object,
  invitable: PropTypes.object,
  removeCollaborator: PropTypes.func,
  updateCollaborator: PropTypes.func,
};

export default CollaboratorsList;
