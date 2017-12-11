import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import ImgAddDot from 'images/add-annotation.png';
import ImgAddLine from 'images/add-line.png';

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
            })
          }
          image={ImgAddDot}
          size={20}
          tooltip="Annotate"
        />
      )}
      {!readOnly && (
        <Icon
          onClick={() =>
            startAnnotation({
              imageID,
              type: 'arrow',
              maxAnchors: 2,
              annotatable: { type: 'Comment', id: null },
            })
          }
          name="ArrowDownRight"
          size={20}
          tooltip="Add arrow"
        />
      )}
      {currentView === 'Measurements' &&
        !readOnly && (
          <Icon
            onClick={() =>
              startAnnotation({ imageID, type: 'line', maxAnchors: 2 })
            }
            image={ImgAddLine}
            size={20}
            tooltip="Add line"
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
