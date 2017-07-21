import React, { PropTypes } from 'react';
import Button from 'components/Button';
import ImageUploader from 'containers/ImageManager/ImageUploader';

const CommentActions = (props) => {
  const { comment, commentable } = props;
  const toggleEdit = () => () => {
    props.startUpdateComment({ comment, commentable });
  };
  return (
    <div className="comment-actions">
      <div>
        <Button onclick={toggleEdit()} label="Edit" shy />
        <Button
          onclick={() => {
            props.deleteComment({ comment, commentable });
          }}
          label="Remove"
          shy
        />
        <ImageUploader
          imageable={{ type: 'Comment', id: comment.get('id') }}
          label="Add image"
        />
      </div>
    </div>
  );
};

CommentActions.propTypes = {
  deleteComment: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
};

export default CommentActions;
