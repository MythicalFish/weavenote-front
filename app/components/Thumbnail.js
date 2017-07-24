import React from 'react';
import { PLACEHOLDER } from 'containers/ProjectImages/constants';

const Thumbnail = (props) => {
  let url = props.url;
  if (!url) {
    url = PLACEHOLDER;
  }
  return (
    <div className="thumbnail">
      <img src={url} role="presentation" />
    </div>
  );
};

Thumbnail.propTypes = {
  url: React.PropTypes.string,
};

export default Thumbnail;
