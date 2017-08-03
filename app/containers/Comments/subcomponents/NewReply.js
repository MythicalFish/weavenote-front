import React, { PropTypes } from 'react';
import Form from './Form';

const NewReply = (props) => {
  if (props.isOwnComment) return null;
  const { createComment, comment, isReplying } = props;
  const startReply = () => {
    props.writeReply({ comment });
  };
  return (
    <div className="comment-newreply">
      <Form
        label="Leave reply"
        isActive={isReplying === comment.get('id')}
        onFocus={startReply}
        onSubmit={createComment}
        initialValues={{
          commentable: { type: 'Comment', id: comment.get('id') },
        }}
        {...props}
      />
    </div>
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
