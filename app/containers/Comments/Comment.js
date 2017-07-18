import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';
import CommentForm from './CommentForm';
import CommentReplies from './CommentReplies';
import CommentReply from './CommentReply';
import CommentActions from './CommentActions';

class Comment extends React.PureComponent {
  state = { isEditing: false, isReplying: false };
  componentDidUpdate = () => {
    if (!this.props.isSelected) {
      if (this.state.isEditing) this.toggleEdit();
      if (this.state.isReplying) this.toggleReply();
    }
  };
  authorName = () =>
    this.props.isOwnComment
      ? 'You'
      : this.props.comment.getIn(['user', 'name']);
  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };
  toggleReply = () => {
    this.setState({ isReplying: !this.state.isReplying });
  };
  commentClass = () => `comment${this.props.isSelected ? ' selected' : ''}`;
  render() {
    const { commentable, comment, switchComment, isSelected } = this.props;
    const { isEditing, isReplying } = this.state;
    const { toggleEdit, toggleReply } = this;
    return (
      <div className={this.commentClass()} onClick={switchComment}>
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
                onSubmit={this.props.update}
                initialValues={{ commentable, comment }}
              />
              : comment.get('text')}
          </div>
        </div>
        {isSelected &&
          !isEditing &&
          <CommentActions {...this.props} {...{ toggleEdit }} />}
        <CommentReply {...this.props} {...{ toggleReply, isReplying }} />
        <CommentReplies />
      </div>
    );
  }
}

Comment.propTypes = {
  isSelected: PropTypes.bool,
  isOwnComment: PropTypes.bool,
  switchComment: PropTypes.func,
  update: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
};

export default Comment;
