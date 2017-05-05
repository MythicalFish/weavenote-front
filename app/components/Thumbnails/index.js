import React, { PropTypes } from 'react';

function Thumbnails(props) {
  const { handleClick, images } = props;
  return (
    <ul className="thumbnails">
      {images && images.toJS().map((image, index) => (
        <li key={`thumbnail-${index}`}>
          <button onClick={() => { handleClick(image); }}>
            <img src={image.url} role="presentation" />
          </button>
        </li>
      ))}
    </ul>
  );
}

Thumbnails.propTypes = {
  images: PropTypes.object,
  handleClick: PropTypes.func,
};

export default Thumbnails;