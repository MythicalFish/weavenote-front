import React, { PropTypes } from 'react';
import Replies from './Replies';
import NewReply from './NewReply';
import Comment from './Comment';

class Thread extends React.PureComponent {
  focusComment = () => {
    const { comment } = this.props;
    if (!this.isSelected()) {
      this.props.focusComment({ comment });
    }
  };
  isSelected = () => {
    const { currentComment, comment } = this.props;
    return currentComment === comment.get('id');
  };
  render() {
    const isSelected = this.isSelected();
    const cClass = `comment-thread${this.isSelected() ? ' selected' : ''}`;
    const cProps = {
      ...this.props,
      isSelected,
    };

    return (
      <div className={cClass}>
        <div onClick={this.focusComment}>
          <Comment {...cProps} />
          <Replies {...cProps} />
        </div>
        {isSelected && <NewReply {...cProps} />}
      </div>
    );
  }
}

Thread.propTypes = {
  focusComment: PropTypes.func,
  comment: PropTypes.object,
  annotation: PropTypes.object,
  currentComment: PropTypes.number,
};

export default Thread;
