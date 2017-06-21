import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import InviteForm from 'components/InviteForm';
import { sendInvite, fetchInvites } from '../../actions';
import { selectInvites } from '../../selectors';

class Collaborators extends React.Component {

  componentDidMount() {
    this.props.fetchInvites();
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        <header>Collaborators</header>
        <div className="p3">

        </div>
        <footer className="bt1 p2">
          <InviteForm
            onSubmit={(data) => {
              const { name, email, as_guest } = data.toJS();
              this.props.sendInvite({ name, email, as_guest, project_id: project.id });
            }}
          />
        </footer>
      </div>
    );
  }
}

Collaborators.propTypes = {
  sendInvite: PropTypes.func,
  fetchInvites: PropTypes.func,
  project: PropTypes.object,
  invites: PropTypes.object,
};


export function mapDispatch(dispatch) {
  return bindActionCreators(
    { sendInvite, fetchInvites },
    dispatch
  );
}

const mapState = createStructuredSelector({
  invites: selectInvites(),
});

export default connect(mapState, mapDispatch)(Collaborators);
