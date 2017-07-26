import React, { PropTypes } from 'react';
import Image from 'components/Image';
import sizeMe from 'react-sizeme';
import Annotations from './Annotations';

function CurrentImage(props) {
  const { currentImage, focus } = props;
  const src = currentImage.getIn(['urls', 'medium']);
  const blurClass = focus === 'annotation' ? '' : 'blurrable';
  return (
    <div className={`canvas-container ${blurClass} z3`}>
      <Image {...{ src }} />
      <Annotations {...props} />
    </div>
  );
}

CurrentImage.propTypes = {
  currentImage: PropTypes.object,
  focus: PropTypes.string,
};

export default sizeMe({ monitorHeight: true })(CurrentImage);
