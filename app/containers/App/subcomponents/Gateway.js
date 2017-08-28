import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import LoginForm from 'components/LoginForm';
import { loggedIn } from 'utils/authUtils';
import Layout from './Layout';
import {
  fetchUser,
  fetchInvite,
  handleInvite,
  setInviteKey,
  fetchGlobalData,
} from '../actions';
import * as selectors from '../selectors';

class Gateway extends React.PureComponent {
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

  enableSignup = () => {
    const { location } = this.props;
    if (location.query.enableSignup !== undefined) return true;
    return !!this.storedInviteKey();
  };

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

    if (!this.props.globalData) {
      this.props.fetchGlobalData();
    }

    if (!this.props.organization) {
      // Create org if not exists
      browserHistory.push('/organization');
    } else if (location.pathname === '/') {
      // Root path disabled, redirect to /projects
      browserHistory.push('/projects');
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
      const loginProps = {
        user,
        invite,
        enableSignup: this.enableSignup(),
        fetchUser: this.props.fetchUser,
      };

      if (storedKey) {
        if (!this.props.invite) {
          return null;
        } else {
          loginProps.asda = 1;
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
  fetchGlobalData: PropTypes.func,
  globalData: PropTypes.object,
  children: PropTypes.node,
  fetchUser: PropTypes.func,
  setInviteKey: PropTypes.func,
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
      fetchGlobalData,
      fetchUser,
      fetchInvite,
      handleInvite,
      setInviteKey,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectors.selectUser(),
  organization: selectors.selectOrganization(),
  invite: selectors.selectInvite(),
  globalData: selectors.selectGlobalData(),
});

export default connect(mapState, mapDispatch)(Gateway);
