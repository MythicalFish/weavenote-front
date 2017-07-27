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
  isAnnotating = () => {
    const { annotation, comment } = this.props;
    const a = annotation.get('annotatable');
    return a && a.id === comment.get('id');
  };
  render() {
    const isSelected = this.isSelected();
    const blurClass = this.isAnnotating() ? '' : 'blurrable';
    const cClass = `comment-wrapper${this.isSelected() ? ' selected' : ''}`;
    const cProps = {
      ...this.props,
      isSelected,
    };

    return (
      <div className={`${cClass} ${blurClass}`} onClick={this.switchComment}>
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
  annotation: PropTypes.object,
  currentComment: PropTypes.number,
};

export default CommentWrapper;
