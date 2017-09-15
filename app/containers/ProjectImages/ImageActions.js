import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const ImageActions = (props) => (
  <div className="on-hover image-actions">
    <Icon onClick={props.focusThis} name="Edit" size={20} />
  </div>
);

ImageActions.propTypes = {
  focusThis: PropTypes.func,
};

export default ImageActions;
