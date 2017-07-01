import React, { PropTypes } from 'react';

export default function Avatar(props) {
  const { user } = props;
  let className = 'avatar';
  if (props.sm) {
    className += ' avatar-sm';
  }
  return (
    <div className={className}>
      <div>
        {user &&
          userLetters(user)
        }
      </div>
    </div>
  );
}

const userLetters = (user) => (
  user.name.split(' ').map((s) => (s.charAt(0).toUpperCase())).join('')
);

Avatar.propTypes = {
  user: PropTypes.object,
  sm: PropTypes.bool,
};
