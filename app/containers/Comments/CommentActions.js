import React, { PropTypes } from 'react';
import Button from 'components/Button';
import ImageUploader from 'containers/ImageUploader';

const CommentActions = (props) => {
  const { comment, commentable } = props;
  const toggleEdit = () => {
    props.editComment({ comment, commentable });
  };
  const id = comment.get('id');
  const actionable = { type: 'Comment', id };
  return (
    <div className="actions">
      <div>
        <Button onClick={toggleEdit} label="Edit" />
        <Button
          label="Remove"
          onClick={() => {
            props.deleteComment({ comment, commentable });
          }}
        />
        {commentable.type === 'Project' &&
          <Button
            label="Add annotation"
            onClick={() => {
              props.addAnnotation({ maxAnchors: 1, annotatable: actionable });
              props.bringFocus('annotation');
              props.cancelCommentAction();
            }}
          />}
        {comment.get('images').size < props.maxImages &&
          <ImageUploader imageable={actionable} label="Add image" />}
      </div>
    </div>
  );
};

CommentActions.propTypes = {
  bringFocus: PropTypes.func,
  addAnnotation: PropTypes.func,
  cancelCommentAction: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
  maxImages: PropTypes.number,
};

export default CommentActions;
