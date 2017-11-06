import React, { PropTypes } from 'react';
import ImageUploader from 'containers/ImageUploader';
import Image from 'components/Image';

export default function FormImage({ initialValues: material, isRestricted }) {
  if (!material) return null;
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
    <div className="field">
      <label>Reference image</label>
      {image && (
        <div className="mb2">
          <Image src={image.getIn(['urls', 'small'])} />
        </div>
      )}
      {!isRestricted && (
        <ImageUploader
          {...iProps}
          label={uploadLabel}
          btnClass="btn-secondary btn-sm"
          inlineIcon="file-image-o"
        />
      )}
    </div>
  );
}

FormImage.propTypes = {
  initialValues: PropTypes.object,
  isRestricted: PropTypes.bool,
};
