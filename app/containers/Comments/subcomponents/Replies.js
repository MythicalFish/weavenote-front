import React, { PropTypes } from 'react';
import Comment from './Comment';

const CommentReplies = (props) => {
  const cProps = { ...props };
  delete cProps.comment;
  delete cProps.commentable;
  return (
    <div className="comment-replies">
      {props.comment
        .get('replies')
        .map((reply) =>
          <Comment
            className="comment-reply"
            key={`comment${reply.get('id')}`}
            comment={reply}
            commentable={{ type: 'Comment', id: props.comment.get('id') }}
            {...cProps}
          />
        )}
    </div>
  );
};

CommentReplies.propTypes = {
  comment: PropTypes.object,
};

export default CommentReplies;
