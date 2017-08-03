import React, { PropTypes } from 'react';
import Form from './Form';

const NewComment = (props) => {
  const { commentable, isCreating } = props;
  const toggleNew = () => {
    props.writeComment({ commentable });
  };
  return (
    <div className="comment-wrapper">
      <Form
        label="Leave a comment"
        isActive={isCreating}
        onFocus={toggleNew}
        onSubmit={props.createComment}
        initialValues={{ commentable }}
        {...props}
      />
    </div>
  );
};

NewComment.propTypes = {
  isCreating: PropTypes.bool,
  createComment: PropTypes.func,
  writeComment: PropTypes.func,
  commentable: PropTypes.object,
};

export default NewComment;
