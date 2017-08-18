import React, { PropTypes } from 'react';

export default function Avatar({ user, src, small, label }) {
  let klass = 'avatar';
  if (small) klass += ' avatar-sm';
  if (label) klass += ' tooltipped';
  return (
    <div className={klass}>
      <img src={user ? user.get('avatar') : src} role="presentation" />
      {label &&
        <div className="tooltip">
          {label}
        </div>}
    </div>
  );
}

Avatar.propTypes = {
  user: PropTypes.object,
  src: PropTypes.string,
  small: PropTypes.bool,
  label: PropTypes.string,
};
