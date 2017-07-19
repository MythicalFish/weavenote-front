import React, { PropTypes } from 'react';
import CommentReplies from './CommentReplies';
import CommentNewReply from './CommentNewReply';
import Comment from './Comment';

class CommentWrapper extends React.PureComponent {
  commentClass = () => `comment-wrapper${this.isSelected() ? ' selected' : ''}`;
  switchComment = () => {
    const { comment } = this.props;
    if (!this.isSelected()) {
      this.props.switchComment({ comment });
    }
  };
  isSelected = () => {
    const { currentComment, comment } = this.props;
    return currentComment === comment.get('id');
  };
  render() {
    const isSelected = this.isSelected();

    const cProps = {
      ...this.props,
      isSelected,
    };

    return (
      <div className={this.commentClass()} onClick={this.switchComment}>
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
  currentComment: PropTypes.number,
  index: PropTypes.number,
};

export default CommentWrapper;
