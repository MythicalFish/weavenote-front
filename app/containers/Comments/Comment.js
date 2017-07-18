import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import CommentForm from './CommentForm';

class Comment extends React.PureComponent {
  state = { editing: false };
  authorName = () =>
    this.props.isOwnComment
      ? 'You'
      : this.props.comment.getIn(['user', 'name']);
  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };
  updateComment = (data) => {
    this.props.update(data);
    this.toggleEdit();
  };
  render() {
    const {
      commentable,
      comment,
      switchComment,
      isSelected,
      isOwnComment,
    } = this.props;
    let cClass = 'comment';
    if (isSelected) cClass += ' selected';
    return (
      <div className={cClass} onClick={switchComment}>
        <div className="flex">
          <div className="comment-avatar flex-none pr1">
            <Avatar user={comment.get('user')} small />
            <div className="comment-author">
              {this.authorName()}
            </div>
          </div>
          <div className="flex-auto">
            {isSelected &&
              <div>
                {this.authorName()}
              </div>}
            {this.state.editing
              ? <CommentForm
                onSubmit={this.updateComment}
                initialValues={{ commentable, comment }}
              />
              : comment.get('text')}
          </div>
        </div>
        <div className="comment-actions">
          {isOwnComment &&
            isSelected &&
            <div>
              <Button onclick={this.toggleEdit} label="Edit" inline />
              <Button
                onclick={() => {
                  this.props.destroy({ comment, commentable });
                }}
                label="Remove"
                inline
              />
            </div>}
          {!isOwnComment &&
            isSelected &&
            <Button onclick={this.startReply} label="Reply" inline />}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  isSelected: PropTypes.bool,
  isOwnComment: PropTypes.bool,
  switchComment: PropTypes.func,
  destroy: PropTypes.func,
  update: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
};

export default Comment;
