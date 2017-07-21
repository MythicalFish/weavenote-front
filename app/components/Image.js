import React, { PropTypes } from 'react';

const Image = (props) => <img src={props.src} role="presentation" className="x-max20" />;

Image.propTypes = {
  src: PropTypes.string,
};

export default Image;
