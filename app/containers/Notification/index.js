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


function defaultOpts(opts) {
  const defaults = {
    message: '',
    position: 'br',
    autoDismiss: 4,
  };
  if (typeof (opts) === 'object') {
    return Object.assign(defaults, opts);
  } else if (typeof (opts) === 'string') {
    defaults.message = opts;
  }
  return defaults;
}

export function notify(opts) {
  return Notifications.success(defaultOpts(opts));
}

export default connect(mapState)(Notification);