import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'containers/App/selectors';
import Button from 'components/Button';
import CommentForm from './CommentForm';
import Comment from './Comment';
import {
  createComment,
  updateComment,
  deleteComment,
  switchComment,
} from './actions';

class Comments extends React.PureComponent {
  state = { creating: false };
  toggleCreate = () => {
    this.setState({ creating: !this.state.creating });
  };
  createComment = (data) => {
    this.props.createComment(data);
    this.toggleCreate();
  };
  switchComment = (i) => () => {
    this.props.switchComment(i);
  };
  isSelected = (comment) => {
    const { currentComment } = this.props;
    if (!currentComment) return false;
    return currentComment.get('id') === comment.get('id');
  };
  isOwnComment = (comment) => {
    const { user } = this.props;
    return user.get('email') === comment.getIn(['user', 'email']);
  };
  render() {
    const {
      commentable,
      comments,
      deleteComment: destroy,
      updateComment: update,
    } = this.props;
    return (
      <div>
        {comments.map((comment, i) =>
          <Comment
            key={`${commentable.type}Comment${i}`}
            {...{ comment, commentable, destroy, update }}
            isSelected={this.isSelected(comment)}
            isOwnComment={this.isOwnComment(comment)}
            switchComment={this.switchComment(i)}
          />
        )}
        {this.state.creating
          ? <CommentForm
            onSubmit={this.createComment}
            initialValues={{ commentable }}
          />
          : <Button
            label="Leave a comment"
            inline
            onclick={this.toggleCreate}
          />}
      </div>
    );
  }
}

Comments.propTypes = {
  createComment: PropTypes.func,
  updateComment: PropTypes.func,
  deleteComment: PropTypes.func,
  switchComment: PropTypes.func,
  commentable: PropTypes.object,
  comments: PropTypes.object,
  user: PropTypes.object,
  currentComment: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { createComment, updateComment, deleteComment, switchComment },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectUser(),
});

export default connect(mapState, mapDispatch)(Comments);
