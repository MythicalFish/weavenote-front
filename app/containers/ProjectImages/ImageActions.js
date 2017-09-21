import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const ImageActions = (props) => {
  const addDot = () => {
    props.addAnnotation({
      maxAnchors: 1,
      type: 'dot',
    });
  };
  const addLine = () => {
    props.addAnnotation({
      maxAnchors: 2,
      type: 'line',
    });
  };
  return (
    <div className="on-hover image-actions">
      <Icon onClick={addDot} name="Circle" size={20} tooltip="Annotate" />
      {props.currentView === 'Measurements' && (
        <Icon
          onClick={addLine}
          name="MoreHorizontal"
          size={20}
          tooltip="Add line"
        />
      )}
      <Icon onClick={props.focusThis} name="Edit" size={20} tooltip="Edit" />
    </div>
  );
};

ImageActions.propTypes = {
  focusThis: PropTypes.func,
  addAnnotation: PropTypes.func,
  currentView: PropTypes.string,
};

export default ImageActions;
