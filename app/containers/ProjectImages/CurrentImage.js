import React, { PropTypes } from 'react';
import Image from 'components/Image';
import sizeMe from 'react-sizeme';
import Annotations from './Annotations';

function CurrentImage(props) {
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

export default sizeMe({ monitorHeight: true })(CurrentImage);
