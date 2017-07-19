import React, { PropTypes } from 'react';
import Button from 'components/Button';
import CommentForm from './CommentForm';

class CommentNewReply extends React.PureComponent {
  state = { isReplying: false };
  componentDidUpdate = () => {
    const { isSelected, isReplying } = this.props;
    if (!isSelected || !isReplying) {
      if (this.state.isReplying) this.toggleReply(false);
    }
  };
  toggleReply = (b) => {
    this.setState({ isReplying: b || !this.state.isReplying });
  };
  startReply = () => {
    this.props.startReplyComment();
    this.toggleReply();
  };
  render() {
    if (this.props.isOwnComment) return null;
    const { createComment, comment } = this.props;
    const { isReplying } = this.state;
    return (
      <div className="comment-newreply">
        {!isReplying
          ? <Button onclick={this.startReply} label="Reply" footer />
          : <CommentForm
            onSubmit={createComment}
            initialValues={{
              commentable: { type: 'Comment', id: comment.get('id') },
            }}
          />}
      </div>
    );
  }
}

CommentNewReply.propTypes = {
  isOwnComment: PropTypes.bool,
  isReplying: PropTypes.bool,
  toggleReply: PropTypes.func,
  createComment: PropTypes.func,
  comment: PropTypes.object,
};

export default CommentNewReply;
