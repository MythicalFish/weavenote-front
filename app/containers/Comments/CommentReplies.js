import React, { PropTypes } from 'react';
import CommentBody from './CommentBody';

class CommentReplies extends React.PureComponent {
  render() {
    const {
      comment,
      isSelected,
      user,
      deleteComment,
      updateComment,
    } = this.props;
    return (
      <div className="comment-replies">
        {comment.get('replies').map((reply) =>
          <CommentBody
            key={`comment${reply.get('id')}`}
            comment={reply}
            commentable={{ type: 'Comment', id: comment.get('id') }}
            {...{
              isSelected,
              user,
              deleteComment,
              updateComment,
            }}
          />
        )}
      </div>
    );
  }
}

CommentReplies.propTypes = {
  comment: PropTypes.object,
};

export default CommentReplies;
