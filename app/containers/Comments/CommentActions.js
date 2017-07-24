import React, { PropTypes } from 'react';
import Button from 'components/Button';
import ImageUploader from 'containers/ImageUploader';

const CommentActions = (props) => {
  const { comment, commentable } = props;
  const toggleEdit = () => () => {
    props.editComment({ comment, commentable });
  };
  const actionTarget = { type: 'Comment', id: comment.get('id') };
  return (
    <div className="actions">
      <div>
        <Button onclick={toggleEdit()} label="Edit" shy />
        <Button
          shy
          label="Remove"
          onclick={() => {
            props.deleteComment({ comment, commentable });
          }}
        />
        {commentable.type === 'Project' &&
          <Button
            shy
            label="Add annotation"
            onclick={() => {
              props.startAnnotation(actionTarget);
            }}
          />}
        {comment.get('images').size < props.maxImages &&
          <ImageUploader imageable={actionTarget} label="Add image" />}
      </div>
    </div>
  );
};

CommentActions.propTypes = {
  deleteComment: PropTypes.func,
  startAnnotation: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
  maxImages: PropTypes.number,
};

export default CommentActions;
