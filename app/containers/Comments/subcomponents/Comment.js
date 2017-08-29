import React, { PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import ImageThumbnails from 'containers/ImageThumbnails';
import Form from './Form';
import Actions from './Actions';
import Wrapper from './Wrapper';

const Date = ({ value }) =>
  <span className="dark4 smaller1 ml2">
    <FormattedDate value={value} day="numeric" month="short" />
  </span>;

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
          <div className="smaller1">
            <span className="bold">
              {authorName}
            </span>
            <Date value={comment.get('created_at')} />
          </div>}
        {this.isEditing()
          ? <div className="comment-edit">
            <Form
              onSubmit={this.props.updateComment}
              initialValues={{ commentable, comment }}
              {...this.props}
            />
          </div>
          : <div className="comment-text">
            {comment.get('text')}
          </div>}
        {isSelected &&
          <ImageThumbnails
            images={comment.get('images')}
            imageable={{ type: 'Comment', id }}
            maxImages={this.props.maxImages}
            deletable={this.isOwnComment()}
          />}
        {isSelected &&
          this.isOwnComment() &&
          !this.isEditing() &&
          <Actions {...this.props} />}
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
