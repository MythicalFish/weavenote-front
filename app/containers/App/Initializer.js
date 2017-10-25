import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import LoginForm from 'components/LoginForm';
import { fetchUser } from 'containers/User/actions';
import { loggedIn } from 'utils/authUtils';
import {
  fetchInvite,
  handleInvite,
  setInviteKey,
  fetchGlobalData,
  openModal,
  closeModal,
} from './actions';
import * as selectors from './selectors';

const Initializer = (Component) => {
  class Init extends React.PureComponent {
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

      if (!this.props.organization && location.pathname !== '/organization') {
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

      if (!user.get('name')) {
        return null;
      }

      if (!this.props.organization && location.pathname !== '/organization') {
        return null;
      }

      const appProps = { ...this.props };
      delete appProps.fetchInvite;
      delete appProps.handleInvite;
      delete appProps.setInviteKey;

      return <Component {...appProps} />;
    }
  }

  /*
   * Global props
   * Any props you want available globally, set here
   */

  Init.propTypes = {
    fetchGlobalData: PropTypes.func,
    globalData: PropTypes.object,
    fetchUser: PropTypes.func,
    setInviteKey: PropTypes.func,
    handleInvite: PropTypes.func,
    fetchInvite: PropTypes.func,
    location: PropTypes.object,
    invite: PropTypes.object,
    user: PropTypes.object,
    organization: PropTypes.object,
  };
  function mapDispatch(dispatch) {
    return bindActionCreators(
      {
        fetchGlobalData,
        fetchUser,
        fetchInvite,
        handleInvite,
        setInviteKey,
        openModal,
        closeModal,
      },
      dispatch
    );
  }
  const mapState = createStructuredSelector({
    user: selectors.selectUser(),
    abilities: selectors.selectAbilities(),
    organization: selectors.selectOrganization(),
    invite: selectors.selectInvite(),
    globalData: selectors.selectGlobalData(),
    modalID: selectors.selectModalID(),
    modalImage: selectors.selectModalImage(),
  });
  return connect(mapState, mapDispatch)(Init);
};

export default Initializer;
