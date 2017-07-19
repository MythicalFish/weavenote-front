import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';
import CommentForm from './CommentForm';
import CommentActions from './CommentActions';

class CommentBody extends React.PureComponent {
  state = { isEditing: false };
  componentDidUpdate = () => {
    if (!this.props.isSelected) {
      if (this.state.isEditing) this.toggleEdit();
    }
  };
  isOwnComment = () => {
    const { user, comment } = this.props;
    return user.get('email') === comment.getIn(['user', 'email']);
  };
  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };
  render() {
    const { comment, commentable, isSelected } = this.props;
    const { isEditing } = this.state;
    const { toggleEdit } = this;
    const authorName = () =>
      this.isOwnComment() ? 'You' : comment.getIn(['user', 'name']);
    return (
      <div>
        <div className="flex">
          <div className="comment-avatar flex-none pr1">
            <Avatar user={comment.get('user')} small />
          </div>
          <div className="flex-auto">
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
          </div>
        </div>
        {isSelected &&
          this.isOwnComment() &&
          !isEditing &&
          <CommentActions {...this.props} {...{ toggleEdit }} />}
      </div>
    );
  }
}

CommentBody.propTypes = {
  isSelected: PropTypes.bool,
  isEditing: PropTypes.bool,
  isOwnComment: PropTypes.bool,
  updateComment: PropTypes.func,
  comment: PropTypes.object,
  commentable: PropTypes.object,
};

export default CommentBody;
