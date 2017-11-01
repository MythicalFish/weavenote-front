import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import ImageUploader from 'containers/ImageUploader';
import confirm from 'utils/confirm';

const ActionIcon = (props) => (
  <Icon {...props} color="malibu" size={12} className="p0" />
);

const UploadIcon = (props) => (
  <ActionIcon name="Image" tooltip="Upload image" {...props} />
);

const Actions = (props) => {
  const { comment, commentable, startAnnotation } = props;
  const toggleEdit = () => {
    props.editComment({ comment, commentable });
  };
  const { id, is_reply: isReply } = comment.toObject();
  const actionable = { type: 'Comment', id };
  const handleDelete = () => {
    confirm('Are you sure you want to archive this comment?').then(() => {
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
        <ActionIcon name="Edit" onClick={toggleEdit} tooltip="Edit" />
        <ActionIcon name="Trash" tooltip="Archive" onClick={handleDelete} />
        {startAnnotation &&
          !isReply && (
            <ActionIcon
              name="Plus"
              tooltip="Annotate"
              onClick={handleAnnotate}
            />
          )}
        {comment.get('images').size < props.maxImages && (
          <ImageUploader imageable={actionable} Icon={UploadIcon} />
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
