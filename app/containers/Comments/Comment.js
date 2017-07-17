import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';
import Button from 'components/Button';

class Comment extends React.PureComponent {
  render() {
    const { comment, user, onClick, isSelected } = this.props;
    let cClass = 'comment';
    if (isSelected) cClass += ' selected';
    return (
      <div className={cClass} onClick={onClick}>
        <div className="comment-avatar">
          <Avatar user={comment.get('user')} small />
          <div className="comment-author">
            {user.get('name')}
          </div>
        </div>
        <div className="comment-body">
          {comment.get('text')}
        </div>
        {user !== comment.get('user') &&
          <div className="comment-actions">
            <Button onclick={this.startReply} label="Reply" inline />
          </div>}
      </div>
    );
  }
}

Comment.propTypes = {
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  comment: PropTypes.object,
  user: PropTypes.object,
};

export default Comment;
