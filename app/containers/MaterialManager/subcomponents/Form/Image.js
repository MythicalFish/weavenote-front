import React, { PropTypes } from 'react';
import ImageUploader from 'containers/ImageUploader';
import ImageThumbnails from 'containers/ImageThumbnails';

export default function Image({ material }) {
  const iProps = {
    maxImages: 1,
    imageable: {
      type: 'Material',
      id: material.get('id'),
    },
  };
  const images = material.get('images');
  const uploadLabel = images.size > 0 ? 'Replace image' : 'Upload image';
  return (
    <div>
      {images.size > 0 &&
        <div className="mb2">
          <ImageThumbnails {...iProps} images={images} size="small" />
        </div>}
      <ImageUploader {...iProps} text={uploadLabel} />
    </div>
  );
}

Image.propTypes = {
  material: PropTypes.object,
};
