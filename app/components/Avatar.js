import React, { PropTypes } from 'react';

export default function Avatar(props) {
  let className = 'avatar';
  if (props.small) {
    className += ' avatar-sm';
  }
  return (
    <div className={className}>
      <img src={props.user.get('avatar')} role="presentation" />
    </div>
  );
}

Avatar.propTypes = {
  user: PropTypes.object,
  small: PropTypes.bool,
};
