import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import NewAnnotation from './NewAnnotation';
import { pixelPosition } from './utils';
import { selectNewAnnotation } from './selectors';
import { writeComment } from '../Comments/actions';
import {
  startAnnotation,
  setAnchor,
  setAnnotation,
  createAnnotation,
  cancelAnnotation,
} from './actions';

class ImageAnnotations extends React.PureComponent {
  isEditing = (annotation) => {
    const { newAnnotation } = this.props;
    const a = annotation.toJS();
    const n = newAnnotation.toJS();
    return a.id === n.id;
  };
  anchorStyle = (type) => (type === 'dot' ? 'default' : 'lineCap');

  render() {
    const { canvasSize, image, currentView, isDoing } = this.props;
    const anchorLayer = [];
    const lineLayer = [];

    image.get('annotations').forEach((annotation, index) => {
      const { id, anchors, type } = annotation.toObject();
      if (this.isEditing(annotation)) return;
      if (type === 'line' && currentView !== 'Measurements') return;
      if (type !== 'line' && currentView === 'Measurements') return;
      anchors.forEach((anchor, i) => {
        anchorLayer.push(
          <Anchor
            key={`Annotation${id}Anchor${i}`}
            position={pixelPosition(anchor.toJS(), canvasSize)}
            style={this.anchorStyle(type)}
          />
        );
      });
      if (anchors.size > 1) {
        lineLayer.push(
          <Line
            {...{
              anchors,
              canvasSize,
              key: `Annotation${id}Line${index}`,
            }}
          />
        );
      }
    });
    return (
      <div>
        <Canvas size={canvasSize}>
          {lineLayer}
          {anchorLayer}
        </Canvas>
        {isDoing('annotate') && <NewAnnotation {...this.props} />}
      </div>
    );
  }
}

ImageAnnotations.propTypes = {
  image: PropTypes.object,
  canvasSize: PropTypes.object,
  newAnnotation: PropTypes.object,
  currentView: PropTypes.string,
  isDoing: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      startAnnotation,
      setAnchor,
      setAnnotation,
      createAnnotation,
      cancelAnnotation,
      writeComment,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  newAnnotation: selectNewAnnotation(),
});

export default connect(mapState, mapDispatch)(ImageAnnotations);
