import React, { PropTypes } from 'react';
import Button from 'components/Button';
import ImageUploader from 'containers/ImageUploader';

const Actions = (props) => {
  const { comment, commentable, addAnnotation } = props;
  const toggleEdit = () => {
    props.editComment({ comment, commentable });
  };
  const { id, is_reply: isReply } = comment.toObject();
  const actionable = { type: 'Comment', id };
  return (
    <div>
      <div className="actions smaller1">
        <Button onClick={toggleEdit} label="Edit" />
        <Button
          label="Remove"
          onClick={() => {
            props.deleteComment({ comment, commentable });
          }}
        />
        {addAnnotation &&
          !isReply &&
          <Button
            inlineIcon="plus"
            label="Annotation"
            onClick={() => {
              addAnnotation({
                maxAnchors: 1,
                annotatable: actionable,
                type: 'dot',
              });
              props.cancelCommentAction();
            }}
          />}
        {comment.get('images').size < props.maxImages &&
          <ImageUploader
            imageable={actionable}
            label="Image"
            inlineIcon="plus"
          />}
      </div>
    </div>
  );
};

Actions.propTypes = {
  addAnnotation: PropTypes.func,
  cancelCommentAction: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
  maxImages: PropTypes.number,
};

export default Actions;
