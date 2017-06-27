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
          'margin': '5px 0 0 0',
          'padding': '10px 15px',
          'border-radius': '4px',
          'color': '#FFF',
          'font-size': '1em',
          'font-weight': 'bold',
          'text-shadow': '0 0 2px rgba(0,0,0,0.4)',
          'border-top': 'none',
          'border-right': '8px solid #28b865',
          'background': '#2ecc71',
          'box-shadow': 'none',
        },
        error: {
          'background': '#e74c3c',
          'border-right': '8px solid #d34334',
        }
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
    dismissible: false,
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

export function notifyError(opts) {
  return Notifications.error(defaultOpts(opts));
}

export default connect(mapState)(Notification);