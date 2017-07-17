import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'containers/App/selectors';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { createComment, updateComment, deleteComment } from './actions';

class Comments extends React.PureComponent {
  state = { selectedComment: null };
  selectComment = (i) => () => {
    console.log(i);
    this.setState({ selectedComment: i });
  };
  render() {
    const { commentable, comments, user } = this.props;
    const { selectedComment } = this.state;
    return (
      <div>
        {comments.map((comment, i) =>
          <Comment
            key={`${commentable.type}Comment${i}`}
            comment={comment}
            user={user}
            isSelected={selectedComment === i}
            onClick={this.selectComment(i)}
          />
        )}
        <CommentForm
          onSubmit={this.props.createComment}
          initialValues={{ commentable }}
        />
      </div>
    );
  }
}

Comments.propTypes = {
  createComment: PropTypes.func,
  updateComment: PropTypes.func,
  deleteComment: PropTypes.func,
  commentable: PropTypes.object,
  comments: PropTypes.object,
  user: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { createComment, updateComment, deleteComment },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectUser(),
});

export default connect(mapState, mapDispatch)(Comments);
