import React, { PropTypes } from 'react';

class CommentReplies extends React.PureComponent {
  render() {
    const { replies } = this.props;
    return (
      <div className="comment-replies">
        {replies.map((reply) =>
          <div className="comment" key={`comment${reply.get('id')}`}>
            {reply.get('text')}
          </div>
        )}
      </div>
    );
  }
}

CommentReplies.propTypes = {
  replies: PropTypes.object,
};

export default CommentReplies;
