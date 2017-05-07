import React from 'react';
import { IMAGE_PLACEHOLDER } from 'containers/App/constants/misc';

const Thumbnail = (props) => {
  let url = props.url;
  if (!url) { url = IMAGE_PLACEHOLDER; }
  return (
    <div className="vh-sq7 overflow-hidden b1">
      <img src={url} role="presentation" />
    </div>
  );
};

Thumbnail.propTypes = {
  url: React.PropTypes.string,
};

export default Thumbnail;
