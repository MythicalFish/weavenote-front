import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Form from './Form';

const NewReply = (props) => {
  if (props.isOwnComment) return null;
  const { createComment, comment, isReplying } = props;
  const startReply = () => {
    props.writeReply({ comment });
  };
  return (
    <div className="comment-newreply">
      {isReplying === comment.get('id')
        ? <Form
          onSubmit={createComment}
          initialValues={{
            commentable: { type: 'Comment', id: comment.get('id') },
          }}
          {...props}
        />
        : <Button onClick={startReply} label="Reply" footer />}
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
