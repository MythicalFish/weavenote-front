import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';
import CommentForm from './CommentForm';
import CommentReplies from './CommentReplies';
import CommentReply from './CommentReply';
import CommentActions from './CommentActions';

class Comment extends React.PureComponent {
  state = { isEditing: false, isReplying: false };
  componentDidUpdate = () => {
    if (!this.isSelected()) {
      if (this.state.isEditing) this.toggleEdit();
      if (this.state.isReplying) this.toggleReply();
    }
  };
  authorName = () =>
    this.isOwnComment() ? 'You' : this.props.comment.getIn(['user', 'name']);
  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };
  toggleReply = () => {
    this.setState({ isReplying: !this.state.isReplying });
  };
  isOwnComment = () => {
    const { user, comment } = this.props;
    return user.get('email') === comment.getIn(['user', 'email']);
  };
  commentClass = () => `comment${this.isSelected() ? ' selected' : ''}`;
  switchComment = (i) => () => {
    this.props.switchComment(i);
  };
  isSelected = () => {
    const { currentComment, comment } = this.props;
    if (!currentComment) return false;
    return currentComment.get('id') === comment.get('id');
  };
  render() {
    const { commentable, comment, index } = this.props;
    const { isEditing, isReplying } = this.state;
    const { toggleEdit, toggleReply } = this;
    const isSelected = this.isSelected();
    const isOwnComment = this.isOwnComment();
    return (
      <div className={this.commentClass()} onClick={this.switchComment(index)}>
        <div className="flex">
          <div className="comment-avatar flex-none pr1">
            <Avatar user={comment.get('user')} small />
          </div>
          <div className="flex-auto">
            {isSelected &&
              <div>
                {this.authorName()}
              </div>}
            {isEditing
              ? <CommentForm
                onSubmit={this.props.updateComment}
                initialValues={{ commentable, comment }}
              />
              : comment.get('text')}
          </div>
        </div>
        {isSelected &&
          isOwnComment &&
          !isEditing &&
          <CommentActions {...this.props} {...{ toggleEdit }} />}
        <CommentReplies replies={comment.get('replies')} />
        <CommentReply {...this.props} {...{ toggleReply, isReplying }} />
      </div>
    );
  }
}

Comment.propTypes = {
  user: PropTypes.object,
  switchComment: PropTypes.func,
  updateComment: PropTypes.func,
  comment: PropTypes.object,
  currentComment: PropTypes.object,
  commentable: PropTypes.object,
  index: PropTypes.number,
};

export default Comment;
