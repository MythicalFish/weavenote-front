import React, { PropTypes } from 'react';
import CommentReplies from './CommentReplies';
import CommentNewReply from './CommentNewReply';
import Comment from './Comment';

class CommentWrapper extends React.PureComponent {
  commentClass = () => `comment-wrapper${this.isSelected() ? ' selected' : ''}`;
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
    const isSelected = this.isSelected();

    const cProps = {
      ...this.props,
      isSelected,
    };

    return (
      <div className={this.commentClass()} onClick={this.switchComment(index)}>
        <Comment {...cProps} className="comment-head" />
        <CommentReplies {...cProps} />
        <CommentNewReply {...cProps} />
      </div>
    );
  }
}

CommentWrapper.propTypes = {
  switchComment: PropTypes.func,
  comment: PropTypes.object,
  currentComment: PropTypes.object,
  index: PropTypes.number,
};

export default CommentWrapper;
