import React, { PropTypes } from 'react';
import Replies from './Replies';
import NewReply from './NewReply';
import Comment from './Comment';

class Wrapper extends React.PureComponent {
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
          <Replies {...cProps} />
        </div>
        <NewReply {...cProps} />
      </div>
    );
  }
}

Wrapper.propTypes = {
  switchComment: PropTypes.func,
  comment: PropTypes.object,
  annotation: PropTypes.object,
  currentComment: PropTypes.number,
};

export default Wrapper;
