import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Layout from './Layout';
import LoginForm from 'components/LoginForm';
import { loggedIn } from 'utils/authUtils';
import { initializeOrganization } from 'containers/Organization/actions';
import { fetchUser, fetchInvite, handleInvite, setInviteKey } from '../actions';
import * as selectors from '../selectors';

class Gateway extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.handleMountOrUpdate();
  }

  componentDidUpdate() {
    this.handleMountOrUpdate();
  }

  newInviteKey = () => {
    const { location } = this.props;
    return location.query.invitation;
  };

  storedInviteKey = () => localStorage.getItem('inviteKey');

  handleMountOrUpdate = () => {
    const newKey = this.newInviteKey();
    const storedKey = this.storedInviteKey();

    if (newKey) {
      this.props.setInviteKey(newKey); // 1 & 2
      return;
    }

    if (!loggedIn()) {
      if (storedKey) {
        const { invite } = this.props;
        if (!invite) {
          this.props.fetchInvite(storedKey); // 3
        }
      }
      return;
    }

    if (storedKey) {
      this.props.handleInvite(storedKey); // 5
      return;
    }

    if (!this.props.user.get('name')) {
      this.props.fetchUser();
      return;
    }

    if (!this.props.organization) {
      this.props.initializeOrganization();
    }
  };

  render() {
    /*

      1. Store invite key if present in URL
      2. Remove key from URL if present in localStorage
      3. Fetch Invite if key present (for prefilled email address)
      4. Render login if !loggedIn()
      5. Run handleInvite() if key present
      6. Fetch user data if no key present
      7. Redirect to /organization if no organization

    */

    const newKey = this.newInviteKey();
    const storedKey = this.storedInviteKey();
    const { user, invite } = this.props;

    if (!loggedIn()) {
      const loginProps = { user, invite, fetchUser: this.props.fetchUser };

      if (storedKey) {
        if (!this.props.invite) {
          return null;
        } else {
          return <LoginForm {...loginProps} />; // 4
        }
      } else if (!newKey) {
        return <LoginForm {...loginProps} />; // 4
      } else {
        return null;
      }
    }

    if (storedKey) {
      return null;
    }

    if (!this.props.user.get('name')) {
      return null;
    }

    if (!this.props.organization && location.pathname !== '/organization') {
      return null;
    }

    return (
      <Layout {...{ location }}>
        {this.props.children}
      </Layout>
    );
  }
}

Gateway.propTypes = {
  children: PropTypes.node,
  fetchUser: PropTypes.func,
  setInviteKey: PropTypes.func,
  initializeOrganization: PropTypes.func,
  handleInvite: PropTypes.func,
  fetchInvite: PropTypes.func,
  location: PropTypes.object,
  invite: PropTypes.object,
  user: PropTypes.object,
  organization: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchUser,
      fetchInvite,
      handleInvite,
      setInviteKey,
      initializeOrganization,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectors.selectUser(),
  organization: selectors.selectOrganization(),
  invite: selectors.selectInvite(),
});

export default connect(mapState, mapDispatch)(Gateway);
