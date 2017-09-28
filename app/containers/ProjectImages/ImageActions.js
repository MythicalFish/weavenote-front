import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const ImageActions = (props) => {
  const { currentView, focusThis, startAnnotation } = props;
  const imageID = props.image.get('id');
  return (
    <div className="on-hover image-actions">
      {currentView !== 'Measurements' && (
        <Icon
          onClick={() =>
            startAnnotation({
              imageID,
              type: 'dot',
              annotatable: { type: 'Comment', id: null },
              maxAnchors: 1,
            })}
          name="Circle"
          size={20}
          tooltip="Annotate"
        />
      )}
      {currentView === 'Measurements' && (
        <Icon
          onClick={() =>
            startAnnotation({ imageID, type: 'line', maxAnchors: 2 })}
          name="MoreHorizontal"
          size={20}
          tooltip="Add line"
        />
      )}
      <Icon onClick={focusThis} name="Edit" size={20} tooltip="Edit" />
    </div>
  );
};

ImageActions.propTypes = {
  focusThis: PropTypes.func,
  startAnnotation: PropTypes.func,
  currentView: PropTypes.string,
  image: PropTypes.object,
};

export default ImageActions;
