import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import InviteForm from './partials/InviteForm';
import InvitesList from './partials/InvitesList';
import CollaboratorsList from './partials/CollaboratorsList';
import {
  fetchInvites, cancelInvite, updateInvite, fetchCollaborators, removeCollaborator, updateCollaborator,
} from './actions';
import { selectInvites, selectCollaborators } from './selectors';

class Collaborators extends React.Component {

  componentDidMount() {
    const p = this.props;
    p.fetchInvites(p.invitable);
    p.fetchCollaborators(p.invitable);
  }

  render() {
    const { invitable, invites, collaborators } = this.props;
    return (
      <div>
        <header>Collaborators</header>
        {collaborators.size > 0 &&
          <div className="p2">
            <CollaboratorsList {...this.props} />
          </div>
        }
        {invites.size > 0 &&
          <div className="bt1 p2">
            Pending invitations
            <InvitesList {...this.props} />
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
  collaborators: PropTypes.object,
};


export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchInvites,
      updateInvite,
      cancelInvite,
      fetchCollaborators,
      updateCollaborator,
      removeCollaborator,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  invites: selectInvites(),
  collaborators: selectCollaborators(),
});

export default connect(mapState, mapDispatch)(Collaborators);
