import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import onClickOutside from 'react-onclickoutside';
import NewComment from './subcomponents/NewComment';
import Thread from './subcomponents/Thread';
import {
  createComment,
  updateComment,
  deleteComment,
  focusComment,
  writeComment,
  editComment,
  writeReply,
  cancelCommentAction,
} from './actions';
import * as selectors from './selectors';

class Comments extends React.PureComponent {
  handleClickOutside = () => {
    const p = this.props;
    if (p.isCreating || p.isReplying || p.isEditing || p.currentComment) {
      p.cancelCommentAction();
    }
  };
  render() {
    const { data, commentable } = this.props;
    const comments = data.get(commentable.type);
    if (!comments) return null;
    const cProps = { ...this.props, maxImages: 3 };
    delete cProps.data;
    return (
      <div>
        <div className="mb2">
          <NewComment {...cProps} />
        </div>
        {comments.map((comment, index) => (
          <Thread
            key={`comment${comment.get('id')}`}
            {...{
              ...cProps,
              comment,
              index,
            }}
          />
        ))}
      </div>
    );
  }
}

Comments.propTypes = {
  data: PropTypes.object,
  commentable: PropTypes.object,
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
      focusComment,
      cancelCommentAction,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  data: selectors.selectData(),
  isCreating: selectors.isCreating(),
  isEditing: selectors.isEditing(),
  isReplying: selectors.isReplying(),
  currentComment: selectors.selectCurrentComment(),
});

export default connect(mapState, mapDispatch)(onClickOutside(Comments));
