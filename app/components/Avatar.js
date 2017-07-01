import React, { PropTypes } from 'react';

export default function Avatar(props) {
  const { user } = props;
  return (
    <div className="avatar">
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
};
