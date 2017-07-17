import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';

const Comment = (props) => {
  const Thing = () => null;
  return (
    <div className="comment">
      <div className="comment-avatar">
        <Avatar user={props.user} small />
        <div className="comment-author">
          {props.user.name}
        </div>
      </div>
      <div className="comment-body">
        {props.text}
      </div>
    </div>
  );
};

Comment.propTypes = {
  text: PropTypes.string,
  user: PropTypes.object,
};

export default Comment;
