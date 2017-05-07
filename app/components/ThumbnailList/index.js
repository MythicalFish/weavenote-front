import React, { PropTypes } from 'react';
import Thumbnail from 'components/Thumbnail';

function ThumbnailList(props) {
  const { handleClick, images } = props;
  return (
    <ul className="thumbnails">
      {images && images.toJS().map((image, index) => (
        <li key={`thumbnail-${index}`}>
          <button onClick={() => { handleClick(image); }}>
            <Thumbnail url={image.url} />
          </button>
        </li>
      ))}
    </ul>
  );
}

ThumbnailList.propTypes = {
  images: PropTypes.object,
  handleClick: PropTypes.func,
};

export default ThumbnailList;
