import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';
import ImageThumbnails from 'containers/ImageThumbnails';
import Form from './Form';
import Actions from './Actions';
import Wrapper from './Wrapper';

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
      <Wrapper user={comment.get('user')}>
        {isSelected &&
          <div className="bold smaller1">
            {authorName}
          </div>}
        {this.isEditing()
          ? <Form
            onSubmit={this.props.updateComment}
            initialValues={{ commentable, comment }}
            {...this.props}
          />
          : comment.get('text')}
        {isSelected &&
          this.isOwnComment() &&
          !this.isEditing() &&
          <Actions {...this.props} />}
        {isSelected &&
          <ImageThumbnails
            images={comment.get('images')}
            imageable={{ type: 'Comment', id }}
            maxImages={this.props.maxImages}
            deletable={this.isOwnComment()}
          />}
      </Wrapper>
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
