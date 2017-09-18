import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const ImageActions = (props) => {
  const addLine = () => {
    props.addAnnotation({
      maxAnchors: 2,
      type: 'line',
    });
  };
  return (
    <div className="on-hover image-actions">
      <Icon onClick={props.focusThis} name="Edit" size={20} />
      {props.currentView === 'Measurements' && (
        <Icon onClick={addLine} name="MoreHorizontal" size={20} />
      )}
    </div>
  );
};

ImageActions.propTypes = {
  focusThis: PropTypes.func,
  addAnnotation: PropTypes.func,
  currentView: PropTypes.string,
};

export default ImageActions;
