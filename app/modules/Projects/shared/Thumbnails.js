import React, { PropTypes } from 'react';

function Thumbnails(props) {
  return (
    <ul className="thumbnails">
      {props.images.map((image, index) => (
        <li key={`thumbnail-${index}`}>
          <button onClick={() => { props.handleClick(image); }}>
            <img src={image.get('url')} role="presentation" />
          </button>
        </li>
      ))}
    </ul>
  );
}

Thumbnails.propTypes = {
  images: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Thumbnails;