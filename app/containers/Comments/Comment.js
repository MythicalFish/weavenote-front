import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';
import CommentForm from './CommentForm';
import CommentActions from './CommentActions';

class Comment extends React.PureComponent {
  state = { isEditing: false };
  componentDidUpdate = () => {
    const { isSelected, isUpdating } = this.props;
    if (!isSelected || !isUpdating) {
      if (this.state.isEditing) this.toggleEdit(false);
    }
  };
  isOwnComment = () => {
    const { user, comment } = this.props;
    return user.get('email') === comment.getIn(['user', 'email']);
  };
  toggleEdit = (b) => {
    this.setState({ isEditing: b || !this.state.isEditing });
  };
  render() {
    const { comment, commentable, isSelected, className } = this.props;
    const { isEditing } = this.state;
    const { toggleEdit } = this;
    const authorName = this.isOwnComment()
      ? 'You'
      : comment.getIn(['user', 'name']);
    return (
      <div className={`comment ${className}`}>
        <div className="flex">
          <div className="comment-avatar flex-none pl1 pt1">
            <Avatar user={comment.get('user')} small />
          </div>
          <div className="flex-auto p1">
            {isSelected &&
              <div>
                {authorName}
              </div>}
            {isEditing
              ? <CommentForm
                onSubmit={this.props.updateComment}
                initialValues={{ commentable, comment }}
              />
              : comment.get('text')}
            {isSelected &&
              this.isOwnComment() &&
              !isEditing &&
              <CommentActions {...this.props} {...{ toggleEdit }} />}
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  isSelected: PropTypes.bool,
  isUpdating: PropTypes.bool,
  updateComment: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
  user: PropTypes.object,
  className: PropTypes.string,
};

export default Comment;
