import React, { PropTypes } from 'react';

const Image = (props) => {
  const iProps = {
    ...props,
  };
  return <img {...iProps} role="presentation" />;
}

Image.propTypes = {
  src: PropTypes.string,
};

export default Image;
