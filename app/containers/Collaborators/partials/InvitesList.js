import React, { PropTypes } from 'react';
import ListItem from 'components/ListItem';

class InvitesList extends React.PureComponent {

  cancelInvite = (invite) => {
    const { cancelInvite } = this.props;
    return () => {
      cancelInvite(invite);
    };
  }

  render() {
    const { invites } = this.props;
    return (
      <div className="y-max8 y-scroll b1 mt1">
        {invites && invites.map((invite, index) => (
          <ListItem key={`invite-${index}`}>
            <div>
              {invite.get('email')}
            </div>
            <div className="list-item-controls">
              <button onClick={this.cancelInvite(invite)}>
                <i className="fa fa-close"></i>
              </button>
            </div>
          </ListItem>
        ))}
      </div>
    );
  }
}

InvitesList.propTypes = {
  invites: PropTypes.object,
  cancelInvite: PropTypes.func,
};

export default InvitesList;