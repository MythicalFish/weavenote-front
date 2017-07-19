import React, { PropTypes } from 'react';
import Button from 'components/Button';

const CommentActions = (props) => {
  const { comment, commentable } = props;
  return (
    <div className="comment-actions">
      <div>
        <Button onclick={props.toggleEdit} label="Edit" shy />
        <Button
          onclick={() => {
            props.deleteComment({ comment, commentable });
          }}
          label="Remove"
          shy
        />
      </div>
    </div>
  );
};

CommentActions.propTypes = {
  isOwnComment: PropTypes.bool,
  toggleEdit: PropTypes.func,
  deleteComment: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
};

export default CommentActions;
