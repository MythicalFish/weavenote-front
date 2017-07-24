import React, { PropTypes } from 'react';
import Button from 'components/Button';
import ImageUploader from 'containers/ImageUploader';

const CommentActions = (props) => {
  const { comment, commentable } = props;
  const toggleEdit = () => () => {
    props.editComment({ comment, commentable });
  };
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
            label="Annotate image"
            onclick={() => {
              props.startAnnotation({ comment });
            }}
          />}
        {comment.get('images').size < props.maxImages &&
          <ImageUploader
            imageable={{ type: 'Comment', id: comment.get('id') }}
            label="Add image"
          />}
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
