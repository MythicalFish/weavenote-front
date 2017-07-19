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
    const { commentable, comments, creatingComment } = this.props;
    return (
      <div>
        {comments.map((comment, index) =>
          <Comment
            key={`${commentable.type}Comment${index}`}
            {...{ comment, index }}
            {...this.props}
          />
        )}
        {creatingComment
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
  creatingComment: PropTypes.bool,
  startCreateComment: PropTypes.func,
  createComment: PropTypes.func,
  commentable: PropTypes.object,
  comments: PropTypes.object,
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
