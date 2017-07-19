import React, { PropTypes } from 'react';
import CommentReplies from './CommentReplies';
import CommentNewReply from './CommentNewReply';
import CommentBody from './CommentBody';

class Comment extends React.PureComponent {
  state = { isReplying: false };
  componentDidUpdate = () => {
    if (!this.isSelected()) {
      if (this.state.isReplying) this.toggleReply();
    }
  };
  toggleReply = () => {
    this.setState({ isReplying: !this.state.isReplying });
  };
  commentClass = () => `comment${this.isSelected() ? ' selected' : ''}`;
  switchComment = (i) => () => {
    if (!this.isSelected()) {
      this.props.switchComment(i);
    }
  };
  isSelected = () => {
    const { currentComment, comment } = this.props;
    if (!currentComment) return false;
    return currentComment.get('id') === comment.get('id');
  };
  render() {
    const { index } = this.props;
    const { isReplying } = this.state;
    const isSelected = this.isSelected();
    const { toggleReply, switchComment } = this;

    const cProps = {
      ...this.props,
      isReplying,
      isSelected,
      toggleReply,
    };

    return (
      <div className={this.commentClass()} onClick={switchComment(index)}>
        <CommentBody {...cProps} className="comment-head" />
        <CommentReplies {...cProps} />
        <CommentNewReply {...cProps} />
      </div>
    );
  }
}

Comment.propTypes = {
  switchComment: PropTypes.func,
  comment: PropTypes.object,
  currentComment: PropTypes.object,
  index: PropTypes.number,
};

export default Comment;
