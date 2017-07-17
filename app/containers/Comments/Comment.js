import React, { PropTypes } from 'react';

const Comment = (props) => {
  const Thing = () => null;
  return (
    <div className="comment">
      <Thing />
      {props.text}
    </div>
  );
};

Comment.propTypes = {
  text: PropTypes.string,
};

export default Comment;
