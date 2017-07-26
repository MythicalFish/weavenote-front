import React, { PropTypes } from 'react';
import Image from 'components/Image';
import Annotations from './Annotations';

export default function CurrentImage(props) {
  const { currentImage } = props;
  const src = currentImage.getIn(['urls', 'medium']);
  return (
    <div className="canvas-container">
      <Image {...{ src }} />
      <Annotations {...props} />
    </div>
  );
}

CurrentImage.propTypes = {
  currentImage: PropTypes.object,
};
