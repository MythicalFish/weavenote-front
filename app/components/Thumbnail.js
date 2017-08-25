import React from 'react';
import { PLACEHOLDER } from 'containers/ProjectImages/constants';

const Thumbnail = (props) => {
  const url = props.url || PLACEHOLDER;
  const size = props.size || 'tiny';
  return (
    <div className={`thumbnail thumbnail-${size}`}>
      <img src={url} role="presentation" />
    </div>
  );
};

Thumbnail.propTypes = {
  url: React.PropTypes.string,
  size: React.PropTypes.string,
};

export default Thumbnail;
