import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Form from './Form';

const NewComment = (props) => {
  const { commentable, isCreating } = props;
  const toggleNew = () => {
    props.writeComment({ commentable });
  };
  return (
    <div>
      {isCreating
        ? <Form
          onSubmit={props.createComment}
          initialValues={{ commentable }}
          {...props}
        />
        : <Button label="Leave a comment" secondary onClick={toggleNew} />}
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
