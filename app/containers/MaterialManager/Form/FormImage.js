import React, { PropTypes } from 'react';
import ImageUploader from 'containers/ImageUploader';
import Image from 'components/Image';

export default function FormImage({ initialValues: material, readOnly }) {
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
      {!readOnly && (
        <ImageUploader
          {...iProps}
          label={uploadLabel}
          btnClass="btn-secondary btn-sm"
          fontIcon="far fa-file-image"
        />
      )}
    </div>
  );
}

FormImage.propTypes = {
  initialValues: PropTypes.object,
  readOnly: PropTypes.bool,
};
