import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'containers/App/selectors';
import { bringFocus } from 'containers/App/actions';
import { addAnnotation } from 'containers/ProjectImages/actions';
import { selectAnnotation } from 'containers/ProjectImages/selectors';
import Button from 'components/Button';
import CommentForm from './CommentForm';
import CommentWrapper from './CommentWrapper';
import {
  createComment,
  updateComment,
  deleteComment,
  switchComment,
  writeComment,
  editComment,
  writeReply,
  cancelCommentAction,
} from './actions';
import * as selectors from './selectors';

class Comments extends React.PureComponent {
  toggleNew = () => {
    const { commentable } = this.props;
    this.props.writeComment({ commentable });
  };
  render() {
    const { commentable, comments, isCreating } = this.props;
    const cProps = { ...this.props, maxImages: 3 };
    delete cProps.comments;
    return (
      <div>
        {comments.map((comment, index) =>
          <CommentWrapper
            key={`comment${comment.get('id')}`}
            {...{
              ...cProps,
              comment,
              index,
            }}
          />
        )}
        {isCreating
          ? <CommentForm
            onSubmit={this.props.createComment}
            initialValues={{ commentable }}
            {...cProps}
          />
          : <Button label="Leave a comment" inline onClick={this.toggleNew} />}
      </div>
    );
  }
}

Comments.propTypes = {
  isCreating: PropTypes.bool,
  writeComment: PropTypes.func,
  createComment: PropTypes.func,
  commentable: PropTypes.object,
  comments: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      writeComment,
      editComment,
      writeReply,
      createComment,
      updateComment,
      deleteComment,
      switchComment,
      cancelCommentAction,
      addAnnotation,
      bringFocus,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectUser(),
  annotation: selectAnnotation(),
  isCreating: selectors.isCreating(),
  isEditing: selectors.isEditing(),
  isReplying: selectors.isReplying(),
  currentComment: selectors.currentComment(),
});

export default connect(mapState, mapDispatch)(Comments);
