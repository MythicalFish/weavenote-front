import React, { PropTypes } from 'react';
import Button from 'components/Button';
import ImageUploader from 'containers/ImageUploader';

const CommentActions = (props) => {
  const { comment, commentable, annotation } = props;
  const toggleEdit = () => {
    props.editComment({ comment, commentable });
  };
  const actionTarget = { type: 'Comment', id: comment.get('id') };
  return (
    <div className="actions">
      {!annotation &&
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
                props.addAnnotation(actionTarget);
                props.cancelCommentAction();
              }}
            />}
          {comment.get('images').size < props.maxImages &&
            <ImageUploader imageable={actionTarget} label="Add image" />}
        </div>}
      {annotation &&
        <div>
          <div>Currently annotating</div>
          <Button onClick={props.cancelAnnotation} label="Cancel" />
        </div>}
    </div>
  );
};

CommentActions.propTypes = {
  addAnnotation: PropTypes.func,
  cancelAnnotation: PropTypes.func,
  cancelCommentAction: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
  annotation: PropTypes.object,
  maxImages: PropTypes.number,
};

export default CommentActions;
