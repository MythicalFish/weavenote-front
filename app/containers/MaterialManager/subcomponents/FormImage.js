import React, { PropTypes } from 'react';
import ImageUploader from 'containers/ImageUploader';
import Image from 'components/Image';

export default function FormImage({ material }) {
  const iProps = {
    maxImages: 1,
    imageable: {
      type: 'Material',
      id: material.get('id'),
    },
  };
  const image = material.get('image');
  const uploadLabel = image ? 'Replace image' : 'Upload image';
  return (
    <div>
      {image && (
        <div className="mb2">
          <Image src={image.getIn(['urls', 'small'])} />
        </div>
      )}
      <ImageUploader
        {...iProps}
        label={uploadLabel}
        btnClass="btn-secondary btn-sm"
        inlineIcon="file-image-o"
      />
    </div>
  );
}

FormImage.propTypes = {
  material: PropTypes.object,
};
