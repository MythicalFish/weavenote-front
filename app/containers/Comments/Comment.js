import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';
import ImageThumbnails from 'containers/ImageThumbnails';
import CommentForm from './CommentForm';
import CommentActions from './CommentActions';

class Comment extends React.PureComponent {
  isOwnComment = () => {
    const { user, comment } = this.props;
    return user.get('email') === comment.getIn(['user', 'email']);
  };
  isEditing = () => this.props.isEditing === this.props.comment.get('id');
  render() {
    const { comment, commentable, isSelected, className } = this.props;
    const id = comment.get('id');
    const authorName = this.isOwnComment()
      ? 'You'
      : comment.getIn(['user', 'name']);
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
            {this.isEditing()
              ? <CommentForm
                onSubmit={this.props.updateComment}
                initialValues={{ commentable, comment }}
                {...this.props}
              />
              : comment.get('text')}
            {isSelected &&
              this.isOwnComment() &&
              !this.isEditing() &&
              <CommentActions {...this.props} />}
            {isSelected &&
              <ImageThumbnails
                images={comment.get('images')}
                imageable={{ type: 'Comment', id }}
                maxImages={this.props.maxImages}
                deletable={this.isOwnComment()}
              />}
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  isSelected: PropTypes.bool,
  isEditing: PropTypes.number,
  updateComment: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
  user: PropTypes.object,
  className: PropTypes.string,
  maxImages: PropTypes.number,
};

export default Comment;
