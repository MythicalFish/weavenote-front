import React, { PropTypes } from 'react';
import ListItem from 'components/ListItem';

class CollaboratorsList extends React.PureComponent {

  removeCollaborator = (collaborator) => (() => {
    const { invitable } = this.props;
    this.props.removeCollaborator({ invitable, collaborator });
  })

  render() {
    const { invitable, collaborators } = this.props;
    return (
      <div className="y-max8 y-scroll b1 mt1">
        {collaborators && collaborators.map((collaborator, index) => (
          <ListItem key={`collaborator-${index}`}>
            <div>
              {collaborator.get('email')}
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
};

export default CollaboratorsList;
