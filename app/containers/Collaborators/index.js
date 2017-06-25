import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import InviteForm from './partials/InviteForm';
import InvitesList from './partials/InvitesList';
import { fetchInvites, cancelInvite, updateInvite } from './actions';
import { selectInvites } from './selectors';

class Collaborators extends React.Component {

  componentDidMount() {
    const p = this.props;
    p.fetchInvites(p.invitable);
  }

  render() {
    const { invitable, invites } = this.props;
    return (
      <div>
        <header>Collaborators</header>
        {invites.size > 0 &&
          <div className="p2">
            <b>Pending invitations</b>
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
};


export function mapDispatch(dispatch) {
  return bindActionCreators(
    { cancelInvite, updateInvite, fetchInvites },
    dispatch
  );
}

const mapState = createStructuredSelector({
  invites: selectInvites(),
});

export default connect(mapState, mapDispatch)(Collaborators);
