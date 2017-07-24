import React, { PropTypes } from 'react';
import Modal from 'components/Modal';
import Image from 'components/Image';

const ModalImage = ({ image }) =>
  <Modal id="image">
    <div className="lh0">
      {image && <Image src={image.getIn(['urls', 'large'])} />}
    </div>
  </Modal>;

ModalImage.propTypes = {
  image: PropTypes.object,
};

export default ModalImage;
