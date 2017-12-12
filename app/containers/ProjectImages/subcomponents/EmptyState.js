import React, { PropTypes } from 'react';
import ImageUploader from 'containers/ImageUploader';
import Icon from 'components/Icon';

const UploadIcon = (props) => (
  <Icon name="Plus" size={40} color="gray-light" {...props} />
);

const EmptyState = (props) => {
  const { imageable } = props;
  return (
    <div className="row">
      <div className="col-xs-8 col-xs-offset-2">
        <div
          className="border-dashed x-fill flex-centered"
          style={{ height: '60vh' }}
        >
          <div className="center">
            <ImageUploader Icon={UploadIcon} {...{ imageable }} />
            <div className="mt3 dark5">Add cover image</div>
          </div>
        </div>
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  imageable: PropTypes.object,
};

export default EmptyState;
