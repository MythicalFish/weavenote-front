import React, { PropTypes } from 'react';
import Button from 'components/Button';

const CommentActions = (props) => {
  const { isOwnComment, comment, commentable } = props;
  return (
    <div className="comment-actions">
      {isOwnComment &&
        <div>
          <Button onclick={props.toggleEdit} label="Edit" shy />
          <Button
            onclick={() => {
              props.destroy({ comment, commentable });
            }}
            label="Remove"
            shy
          />
        </div>}
    </div>
  );
};

CommentActions.propTypes = {
  isOwnComment: PropTypes.bool,
  toggleEdit: PropTypes.func,
  destroy: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
};

export default CommentActions;
