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
  startCreateComment,
} from './actions';

class Comments extends React.PureComponent {
  render() {
    const {
      commentable,
      comments,
      isCreating,
      user,
      currentComment,
    } = this.props;
    const {
      createComment,
      updateComment,
      deleteComment,
      switchComment,
    } = this.props;
    const actions = {
      createComment,
      updateComment,
      deleteComment,
      switchComment,
    };
    return (
      <div>
        {comments.map((comment, index) =>
          <Comment
            key={`comment${comment.get('id')}`}
            {...{
              user,
              currentComment,
              commentable,
              comment,
              index,
              ...actions,
            }}
          />
        )}
        {isCreating
          ? <CommentForm
            onSubmit={this.props.createComment}
            initialValues={{ commentable }}
          />
          : <Button
            label="Leave a comment"
            inline
            onclick={this.props.startCreateComment}
          />}
      </div>
    );
  }
}

Comments.propTypes = {
  isCreating: PropTypes.bool,
  startCreateComment: PropTypes.func,
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
    {
      startCreateComment,
      createComment,
      updateComment,
      deleteComment,
      switchComment,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectUser(),
});

export default connect(mapState, mapDispatch)(Comments);
