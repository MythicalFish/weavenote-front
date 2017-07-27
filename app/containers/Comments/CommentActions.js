import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';
import ImageUploader from 'containers/ImageUploader';

const CommentActions = (props) => {
  const { comment, commentable } = props;
  const toggleEdit = () => {
    props.editComment({ comment, commentable });
  };
  const id = comment.get('id');
  const actionable = { type: 'Comment', id };
  return (
    <div>
      <Dropdown align="right" className="tr lh0 pt2 pr2 dropdown-inline">
        <Button onClick={toggleEdit} label="Edit" />
        <Button
          label="Remove"
          onClick={() => {
            props.deleteComment({ comment, commentable });
          }}
        />
      </Dropdown>
      <div className="actions">
        {commentable.type === 'Project' &&
          <Button
            inlineIcon="plus"
            label="Annotation"
            onClick={() => {
              props.addAnnotation({
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

CommentActions.propTypes = {
  addAnnotation: PropTypes.func,
  cancelCommentAction: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
  maxImages: PropTypes.number,
};

export default CommentActions;
