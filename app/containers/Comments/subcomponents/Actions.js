import React, { PropTypes } from 'react';
import Button from 'components/Button';
import ImageUploader from 'containers/ImageUploader';
import confirm from 'utils/confirm';

const Actions = (props) => {
  const { comment, commentable, startAnnotation } = props;
  const toggleEdit = () => {
    props.editComment({ comment, commentable });
  };
  const { id, is_reply: isReply } = comment.toObject();
  const actionable = { type: 'Comment', id };
  const handleDelete = () => {
    confirm('Are you sure you want to delete this comment?').then(() => {
      props.deleteComment({ comment, commentable });
    });
  };
  const handleAnnotate = () => {
    startAnnotation({
      maxAnchors: 1,
      annotatable: actionable,
      type: 'dot',
    });
    props.cancelCommentAction();
  };
  return (
    <div>
      <div className="actions smaller1">
        <Button inlineIcon="edit" onClick={toggleEdit} label="Edit" />
        <Button inlineIcon="close" label="Delete" onClick={handleDelete} />
        {startAnnotation &&
        !isReply && (
          <Button inlineIcon="plus" label="Annotate" onClick={handleAnnotate} />
        )}
        {comment.get('images').size < props.maxImages && (
          <ImageUploader
            imageable={actionable}
            label="Add image"
            inlineIcon="plus"
          />
        )}
      </div>
    </div>
  );
};

Actions.propTypes = {
  startAnnotation: PropTypes.func,
  cancelCommentAction: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
  maxImages: PropTypes.number,
};

export default Actions;
