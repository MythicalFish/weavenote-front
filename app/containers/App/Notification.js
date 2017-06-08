import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Notifications from 'react-notification-system-redux';
import { selectNotifications } from './selectors';

class Notification extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { notifications } = this.props;
    const style = {
      NotificationItem: {
        DefaultStyle: {
          margin: '10px 5px 2px 1px',
        },
        success: {
          color: 'green',
        },
      },
    };
    return (
      <Notifications
        notifications={notifications}
        style={style}
      />
    );
  }
}

Notification.propTypes = {
  notifications: PropTypes.array,
};

Notification.contextTypes = {
  store: PropTypes.object,
};

const mapState = createStructuredSelector({
  notifications: selectNotifications(),
});


function notificationOpts(opts) {
  const defaults = {
    message: '',
    position: 'br',
    autoDismiss: 4,
  };
  return Object.assign(defaults, opts);
}

export function notify(opts) {
  return Notifications.success(notificationOpts(opts));
}

export default connect(mapState)(Notification);