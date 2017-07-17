import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { createComment, updateComment, deleteComment } from './actions';

class Comments extends React.PureComponent {
  render() {
    const { currentComment, commentable, comments } = this.props;
    return (
      <div>
        {comments.map((comment, i) =>
          <Comment key={`${commentable.type}Comment${i}`} {...comment.toJS()} />
        )}
        <CommentForm
          onSubmit={this.props.createComment}
          initialValues={{ commentable, ...currentComment }}
        />
      </div>
    );
  }
}

Comments.propTypes = {
  createComment: PropTypes.func,
  updateComment: PropTypes.func,
  deleteComment: PropTypes.func,
  currentComment: PropTypes.object,
  commentable: PropTypes.object,
  comments: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { createComment, updateComment, deleteComment },
    dispatch
  );
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(Comments);
