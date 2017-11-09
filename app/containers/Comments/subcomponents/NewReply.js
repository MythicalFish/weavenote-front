import React, { PropTypes } from 'react';
import Form from './Form';
import Wrapper from './Wrapper';

class NewReply extends React.PureComponent {
  handleSubmit = (payload) => {
    this.props.createComment(payload);
  };
  render() {
    if (this.props.isOwnComment) return null;
    const { comment, isReplying, writeReply } = this.props;
    const id = comment.get('id');
    const commentable = { type: 'Comment', id };
    if (comment.get('archived')) return null;
    if (isReplying === id) {
      const { handleSubmit: onSubmit } = this;
      const rProps = { ...this.props, commentable, onSubmit };
      delete rProps.comment;
      return (
        <div className="comment-newreply">
          <Wrapper {...this.props}>
            <Form {...rProps} />
          </Wrapper>
        </div>
      );
    }
    return (
      <button
        className="comment-newreply"
        type="button"
        onClick={() => writeReply({ comment })}
      >
        <Wrapper {...this.props}>Reply</Wrapper>
      </button>
    );
  }
}

NewReply.propTypes = {
  isOwnComment: PropTypes.bool,
  isReplying: PropTypes.number,
  writeReply: PropTypes.func,
  createComment: PropTypes.func,
  comment: PropTypes.object,
};

export default NewReply;
