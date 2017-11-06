import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import onClickOutside from 'react-onclickoutside';
import NewComment from './subcomponents/NewComment';
import Thread from './subcomponents/Thread';
import Tabs from './subcomponents/Tabs';
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  focusComment,
  writeComment,
  editComment,
  writeReply,
  cancelCommentAction,
} from './actions';
import { startAnnotation } from '../ProjectAnnotations/actions';
import { selectCurrentImage } from '../ProjectImages/selectors';
import * as selectors from './selectors';
import { VIEW } from './constants';

class Comments extends React.PureComponent {
  state = { view: VIEW.active };
  componentDidMount() {
    this.fetchComments();
    if (process.env.NODE_ENV === 'production') {
      setInterval(() => this.fetchComments(), 10000);
    }
  }
  changeView = (view) => {
    this.setState({ view });
    setTimeout(() => {
      this.fetchComments();
    }, 50);
  };
  fetchComments = () => {
    const { commentable } = this.props;
    const archived = this.state.view !== VIEW.active;
    this.props.fetchComments({ commentable, archived });
  };
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
    cProps.currentView = this.state.view;
    cProps.changeView = this.changeView;
    cProps.abilities = this.props.abilities.get('Comment').toJS();
    return (
      <div>
        <Tabs {...cProps} />
        {this.state.view === VIEW.active && (
          <div className="mb2">
            <NewComment {...cProps} />
          </div>
        )}
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
  fetchComments: PropTypes.func,
  data: PropTypes.object,
  abilities: PropTypes.object,
  commentable: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchComments,
      writeComment,
      editComment,
      writeReply,
      createComment,
      updateComment,
      deleteComment,
      focusComment,
      cancelCommentAction,
      startAnnotation,
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
  currentImage: selectCurrentImage(),
});

export default connect(mapState, mapDispatch)(onClickOutside(Comments));
