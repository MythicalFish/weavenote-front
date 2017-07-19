import React, { PropTypes } from 'react';
import Button from 'components/Button';
import CommentForm from './CommentForm';

const CommentReply = (props) => {
  const { isReplying, createComment, comment } = props;
  if (props.isOwnComment) return null;
  return (
    <div className="comment-reply">
      {!isReplying
        ? <Button onclick={props.toggleReply} label="Reply" shy />
        : <CommentForm
          onSubmit={createComment}
          initialValues={{
            commentable: { type: 'Comment', id: comment.get('id') },
          }}
        />}
    </div>
  );
};

CommentReply.propTypes = {
  isOwnComment: PropTypes.bool,
  isReplying: PropTypes.bool,
  toggleReply: PropTypes.func,
  createComment: PropTypes.func,
  comment: PropTypes.object,
};

export default CommentReply;
