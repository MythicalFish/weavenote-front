import React, { PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import ImageThumbnails from 'components/ImageThumbnails';
import Form from './Form';
import Actions from './Actions';
import Wrapper from './Wrapper';

const Date = ({ value }) => (
  <span className="dark4 smaller1 ml2">
    <FormattedDate
      value={value}
      day="numeric"
      month="short"
      hour="numeric"
      minute="numeric"
    />
  </span>
);

class Comment extends React.PureComponent {
  handleSubmitEdit = (payload) => {
    this.props.updateComment(payload);
  };
  render() {
    const { comment, isSelected, user } = this.props;
    const isEditing = this.props.isEditing === comment.get('id');
    const isOwnComment = user.get('email') === comment.getIn(['user', 'email']);
    const authorName = isOwnComment ? 'You' : comment.getIn(['user', 'name']);
    return (
      <Wrapper user={comment.get('user')}>
        {isSelected && (
          <div className="smaller1">
            <span className="bold">{authorName}</span>
            <Date value={comment.get('created_at')} />
          </div>
        )}
        {isEditing ? (
          <div className="comment-edit">
            <Form onSubmit={this.handleSubmitEdit} {...this.props} />
          </div>
        ) : (
          <div className="comment-text">{comment.get('text')}</div>
        )}
        {isSelected && <ImageThumbnails images={comment.get('images')} />}
        {isSelected &&
          !isEditing && <Actions {...this.props} isOwnComment={isOwnComment} />}
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
