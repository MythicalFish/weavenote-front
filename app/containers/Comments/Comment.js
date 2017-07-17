import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';

const Comment = (props) => {
  const Thing = () => null;
  return (
    <div className="comment">
      <Avatar user={props.user} small />
      {props.text}
    </div>
  );
};

Comment.propTypes = {
  text: PropTypes.string,
  user: PropTypes.object,
};

export default Comment;
