import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';
import ImageManager from 'containers/ImageManager';
import CommentForm from './CommentForm';
import CommentActions from './CommentActions';

class Comment extends React.PureComponent {
  isOwnComment = () => {
    const { user, comment } = this.props;
    return user.get('email') === comment.getIn(['user', 'email']);
  };
  render() {
    const { comment, commentable, isSelected, className } = this.props;
    const authorName = this.isOwnComment()
      ? 'You'
      : comment.getIn(['user', 'name']);
    const isUpdating = this.props.isUpdating === comment.get('id');
    return (
      <div className={`comment ${className}`}>
        <div className="flex">
          <div className="comment-avatar flex-none pl1">
            <Avatar user={comment.get('user')} small />
          </div>
          <div className="flex-auto p1">
            {isSelected &&
              <div className="bold">
                {authorName}
              </div>}
            {isUpdating
              ? <CommentForm
                onSubmit={this.props.updateComment}
                initialValues={{ commentable, comment }}
              />
              : comment.get('text')}
            {isSelected &&
              this.isOwnComment() &&
              !isUpdating &&
              <CommentActions {...this.props} />}
            <ImageManager
              useModal
              allowEdit={this.isOwnComment() && isSelected}
              imageable={{ type: 'Comment', id: comment.get('id') }}
              maxImages={3}
              images={comment.get('images')}
            />
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  isSelected: PropTypes.bool,
  isUpdating: PropTypes.number,
  updateComment: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
  user: PropTypes.object,
  className: PropTypes.string,
};

export default Comment;
