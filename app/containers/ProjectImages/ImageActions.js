import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const ImageActions = (props) => {
  const { currentView, focusThis, startAnnotation, readOnly } = props;
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
      {currentView === 'Measurements' &&
        !readOnly && (
          <Icon
            onClick={() =>
              startAnnotation({ imageID, type: 'line', maxAnchors: 2 })}
            name="MoreHorizontal"
            size={20}
            tooltip="Add line"
          />
        )}
      {currentView === 'Measurements' &&
        !readOnly && (
          <Icon
            onClick={() =>
              startAnnotation({ imageID, type: 'arrow', maxAnchors: 2 })}
            name="ArrowDownRight"
            size={20}
            tooltip="Add arrow"
          />
        )}
      {!readOnly && (
        <Icon onClick={focusThis} name="Edit" size={20} tooltip="Edit" />
      )}
    </div>
  );
};

ImageActions.propTypes = {
  focusThis: PropTypes.func,
  readOnly: PropTypes.bool,
  startAnnotation: PropTypes.func,
  currentView: PropTypes.string,
  image: PropTypes.object,
};

export default ImageActions;
