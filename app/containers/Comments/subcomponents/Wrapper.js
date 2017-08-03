import React, { PropTypes } from 'react';
import Avatar from 'components/Avatar';

const Wrapper = (props) =>
  <div className="comment-wrapper">
    <div className="comment-avatar">
      <Avatar user={props.user} small />
    </div>
    <div className="comment-body">
      {props.children}
    </div>
  </div>;

Wrapper.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
};

export default Wrapper;
