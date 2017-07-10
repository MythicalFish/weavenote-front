import React from 'react';
import { IMAGE_PLACEHOLDER } from 'containers/ProjectManager/constants';

const Thumbnail = (props) => {
  let url = props.url;
  if (!url) {
    url = IMAGE_PLACEHOLDER;
  }
  return (
    <div className="">
      <img src={url} role="presentation" />
    </div>
  );
};

Thumbnail.propTypes = {
  url: React.PropTypes.string,
};

export default Thumbnail;
