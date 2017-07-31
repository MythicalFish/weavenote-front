import React, { PropTypes } from 'react';
import CommentReplies from './CommentReplies';
import CommentNewReply from './CommentNewReply';
import Comment from './Comment';

class CommentWrapper extends React.PureComponent {
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
    const cClass = `comment-wrapper${this.isSelected() ? ' selected' : ''}`;
    const cProps = {
      ...this.props,
      isSelected,
    };

    return (
      <div className={cClass}>
        <div onClick={this.switchComment}>
          <Comment {...cProps} className="comment-head" />
          <CommentReplies {...cProps} />
        </div>
        <CommentNewReply {...cProps} />
      </div>
    );
  }
}

CommentWrapper.propTypes = {
  switchComment: PropTypes.func,
  comment: PropTypes.object,
  annotation: PropTypes.object,
  currentComment: PropTypes.number,
};

export default CommentWrapper;
