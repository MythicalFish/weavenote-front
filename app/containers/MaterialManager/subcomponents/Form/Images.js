import React, { PropTypes } from 'react';
import ImageThumbnails from 'containers/ImageThumbnails';
import ImageUploader from 'containers/ImageUploader';

export default function Images({ material }) {
  const iProps = {
    maxImages: 4,
    imageable: {
      type: 'Material',
      id: material.get('id'),
    },
  };
  return (
    <div>
      <ImageThumbnails images={material.get('images')} {...iProps} deletable />
      <ImageUploader {...iProps} />
    </div>
  );
}

Images.propTypes = {
  material: PropTypes.object,
};
