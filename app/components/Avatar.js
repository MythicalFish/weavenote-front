import React, { PropTypes } from 'react';

export default function Avatar(props) {
  let user = props.user || {};
  if (user.toJS) user = user.toJS();
  let className = 'avatar';
  if (props.small) {
    className += ' avatar-sm';
  }
  return (
    <div className={className}>
      <img src={user.avatar} role="presentation" />
    </div>
  );
}

Avatar.propTypes = {
  user: PropTypes.object,
  small: PropTypes.bool,
};
