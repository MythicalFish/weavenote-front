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
    const isUpdating = this.props.isUpdating === comment.get('id');
    const isOwnComment = this.isOwnComment();
    const authorName = isOwnComment ? 'You' : comment.getIn(['user', 'name']);
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
              isOwnComment &&
              !isUpdating &&
              <CommentActions {...this.props} />}
            {isSelected &&
              <ImageManager
                images={comment.get('images')}
                imageable={{ type: 'Comment', id: comment.get('id') }}
                maxImages={3}
                type="modal"
                allowEdit={isOwnComment}
              />}
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
