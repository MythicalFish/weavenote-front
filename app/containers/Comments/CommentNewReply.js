import React, { PropTypes } from 'react';
import Button from 'components/Button';
import CommentForm from './CommentForm';

class CommentNewReply extends React.PureComponent {
  startReply = () => {
    const { comment } = this.props;
    this.props.startReplyComment({ comment });
  };
  render() {
    if (this.props.isOwnComment) return null;
    const { createComment, comment, isReplying } = this.props;
    return (
      <div className="comment-newreply">
        {isReplying === comment.get('id')
          ? <CommentForm
            onSubmit={createComment}
            initialValues={{
              commentable: { type: 'Comment', id: comment.get('id') },
            }}
          />
          : <Button onclick={this.startReply} label="Reply" footer />}
      </div>
    );
  }
}

CommentNewReply.propTypes = {
  isOwnComment: PropTypes.bool,
  isReplying: PropTypes.number,
  startReplyComment: PropTypes.func,
  createComment: PropTypes.func,
  comment: PropTypes.object,
};

export default CommentNewReply;
