import React, { PropTypes } from 'react';
import Placeholder from 'images/placeholder-thumb.jpg';

const Thumbnail = (props) => {
  const url = props.url || Placeholder;
  const size = props.size || 'tiny';
  return (
    <div className={`thumbnail thumbnail-${size}`}>
      <img src={url} role="presentation" />
    </div>
  );
};

Thumbnail.propTypes = {
  url: PropTypes.string,
  size: PropTypes.string,
};

export default Thumbnail;
