import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'containers/App/selectors';
import NewComment from './subcomponents/NewComment';
import Thread from './subcomponents/Thread';
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
  render() {
    const { comments } = this.props;
    const cProps = { ...this.props, maxImages: 3 };
    delete cProps.comments;
    return (
      <div>
        <div className="mb2">
          <NewComment {...cProps} />
        </div>
        {comments.map((comment, index) =>
          <Thread
            key={`comment${comment.get('id')}`}
            {...{
              ...cProps,
              comment,
              index,
            }}
          />
        )}
      </div>
    );
  }
}

Comments.propTypes = {
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
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectUser(),
  isCreating: selectors.isCreating(),
  isEditing: selectors.isEditing(),
  isReplying: selectors.isReplying(),
  currentComment: selectors.selectCurrentComment(),
});

export default connect(mapState, mapDispatch)(Comments);
