import React, { PropTypes } from 'react';
import { Layer } from 'react-konva';
import { withCanvas } from 'components/Canvas';
import Annotation from './Annotation';

const AnnotationCanvas = (props) => {
  const { annotations, imageID, newAnnotation } = props;
  return (
    <Layer>
      {annotations
        .filter((a) => a.get('image_id') === imageID)
        .map((annotation, index) => (
          <Annotation
            key={`Annotation${index}`}
            annotation={annotation}
            {...props}
          />
        ))}
      {props.isAnnotating && (
        <Annotation annotation={newAnnotation} {...props} />
      )}
    </Layer>
  );
};

AnnotationCanvas.propTypes = {
  imageID: PropTypes.number,
  annotations: PropTypes.object,
  newAnnotation: PropTypes.object,
  isAnnotating: PropTypes.bool,
};

export default withCanvas(AnnotationCanvas);
