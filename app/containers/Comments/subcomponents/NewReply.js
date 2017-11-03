import React, { PropTypes } from 'react';
import Form from './Form';
import Wrapper from './Wrapper';

const NewReply = (props) => {
  if (props.isOwnComment) return null;
  const { createComment, comment, isReplying, writeReply } = props;
  const id = comment.get('id');
  const commentable = { type: 'Comment', id };
  if (comment.get('archived')) return null;
  if (isReplying === id) {
    return (
      <div className="comment-newreply">
        <Wrapper {...props}>
          <Form
            onSubmit={createComment}
            initialValues={{ commentable }}
            {...props}
          />
        </Wrapper>
      </div>
    );
  }
  return (
    <button
      className="comment-newreply"
      type="button"
      onClick={() => writeReply({ comment })}
    >
      <Wrapper {...props}>Reply</Wrapper>
    </button>
  );
};

NewReply.propTypes = {
  isOwnComment: PropTypes.bool,
  isReplying: PropTypes.number,
  writeReply: PropTypes.func,
  createComment: PropTypes.func,
  comment: PropTypes.object,
};

export default NewReply;
