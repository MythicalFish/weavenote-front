import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import ImageUploader from 'containers/ImageUploader';
import confirm from 'utils/confirm';
import { VIEW } from '../constants';

const ActionIcon = (props) => (
  <Icon {...props} color="malibu" size={12} className="p0" />
);

const UploadIcon = (props) => (
  <ActionIcon name="Image" tooltip="Upload image" {...props} />
);

const Actions = (props) => {
  const {
    comment,
    commentable,
    startAnnotation,
    currentImage,
    updateComment,
    changeView,
    isOwnComment,
    abilities,
  } = props;
  const toggleEdit = () => {
    props.editComment({ comment, commentable });
  };
  const { id, is_reply: isReply } = comment.toObject();
  const label = isReply ? 'Reply' : 'Comment';
  const deleteLabel = isReply ? 'Delete' : 'Archive';
  const actionable = { type: 'Comment', id };
  const handleDelete = () => {
    confirm(`Are you sure you want to ${deleteLabel} this ${label}?`).then(
      () => {
        props.deleteComment({ id, commentable });
      }
    );
  };
  const handleRestore = () => {
    updateComment({
      commentable,
      comment: comment.set('archived', false).toJS(),
    });
    changeView(VIEW.active);
  };
  const handleAnnotate = () => {
    startAnnotation({
      maxAnchors: 1,
      annotatable: actionable,
      type: 'dot',
      imageID: currentImage.get('id'),
    });
    props.cancelCommentAction();
  };
  const hasAnnotation = !!comment.get('annotation');
  return (
    <div>
      {!comment.get('archived') && (
        <div className="actions smaller1">
          {isOwnComment && (
            <ActionIcon name="Edit" onClick={toggleEdit} tooltip="Edit" />
          )}
          {(isOwnComment || abilities.destroy) && (
            <ActionIcon
              name="Trash"
              tooltip={deleteLabel}
              onClick={handleDelete}
            />
          )}
          {isOwnComment &&
            !hasAnnotation &&
            !isReply && (
              <ActionIcon
                name="Plus"
                tooltip="Annotate"
                onClick={handleAnnotate}
              />
            )}
          {isOwnComment &&
            comment.get('images').size < props.maxImages && (
              <ImageUploader imageable={actionable} Icon={UploadIcon} />
            )}
        </div>
      )}
      {comment.get('archived') &&
        !isReply && (
          <div className="actions smaller1">
            <ActionIcon
              name="Share"
              tooltip="Restore"
              onClick={handleRestore}
            />
          </div>
        )}
    </div>
  );
};

Actions.propTypes = {
  startAnnotation: PropTypes.func,
  cancelCommentAction: PropTypes.func,
  updateComment: PropTypes.func,
  changeView: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
  currentImage: PropTypes.object,
  maxImages: PropTypes.number,
  abilities: PropTypes.object,
  isOwnComment: PropTypes.bool,
};

export default Actions;
