import React, { PropTypes } from 'react';

function Thumbnails(props) {
  return (
    <ul className="thumbnails">
      {props.images.map((image, index) => (
        <li key={`thumbnail-${index}`}>
          <button onClick={props.onClick}>
            <img src={image.url} role="presentation" />
          </button>
        </li>
      ))}
    </ul>
  );
}

Thumbnails.propTypes = {
  images: PropTypes.array.required,
  onClick: PropTypes.func.required,
};

export default Thumbnails;
