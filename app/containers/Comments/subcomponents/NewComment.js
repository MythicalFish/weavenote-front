import React, { PropTypes } from 'react';
import Form from './Form';
import Wrapper from './Wrapper';

const NewComment = (props) => {
  const { commentable, isCreating, writeComment } = props;
  if (isCreating) {
    return (
      <div className="comment-thread selected ignore-react-onclickoutside">
        <Wrapper {...props}>
          <Form
            onSubmit={props.createComment}
            initialValues={{ commentable }}
            {...props}
          />
        </Wrapper>
      </div>
    );
  }
  return (
    <button
      className="comment-thread selected"
      type="button"
      onClick={() => writeComment({ commentable })}
    >
      <Wrapper {...props}>Leave a comment</Wrapper>
    </button>
  );
};

NewComment.propTypes = {
  isCreating: PropTypes.bool,
  createComment: PropTypes.func,
  writeComment: PropTypes.func,
  commentable: PropTypes.object,
};

export default NewComment;
