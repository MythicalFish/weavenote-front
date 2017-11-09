import React, { PropTypes } from 'react';
import Form from './Form';
import Wrapper from './Wrapper';

class NewComment extends React.PureComponent {
  handleSubmitNew = (payload) => {
    this.props.createComment(payload);
  };
  render() {
    const { commentable, isCreating, writeComment } = this.props;
    if (isCreating) {
      return (
        <div className="comment-thread selected">
          <Wrapper {...this.props}>
            <Form onSubmit={this.handleSubmitNew} {...this.props} />
          </Wrapper>
        </div>
      );
    }
    return (
      <button
        className="comment-thread selected"
        type="button"
        onClick={() => writeComment({ commentable })}
      >
        <Wrapper {...this.props}>Leave a comment</Wrapper>
      </button>
    );
  }
}

NewComment.propTypes = {
  isCreating: PropTypes.bool,
  createComment: PropTypes.func,
  writeComment: PropTypes.func,
  commentable: PropTypes.object,
};

export default NewComment;
