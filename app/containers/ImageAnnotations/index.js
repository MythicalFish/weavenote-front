import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import NewAnnotation from './NewAnnotation';
import { pixelPosition } from './utils';
import { selectNewAnnotation, selectIsAnnotating } from './selectors';
import { setAnnotation, createAnnotation, cancelAnnotation } from './actions';

class ImageAnnotations extends React.PureComponent {
  isEditing = (annotation) => {
    const { newAnnotation } = this.props;
    const { annotatable: a } = annotation.toJS();
    const { annotatable: n } = newAnnotation.toJS();
    return n && a.type === n.type && a.id === n.id;
  };
  anchorStyle = (type) => (type === 'dot' ? 'default' : 'lineCap');

  render() {
    const { canvasSize, image, currentView, isAnnotating } = this.props;
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
        {isAnnotating && <NewAnnotation {...this.props} />}
      </div>
    );
  }
}

ImageAnnotations.propTypes = {
  image: PropTypes.object,
  canvasSize: PropTypes.object,
  newAnnotation: PropTypes.object,
  currentView: PropTypes.string,
  isAnnotating: PropTypes.bool,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      setAnnotation,
      createAnnotation,
      cancelAnnotation,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  newAnnotation: selectNewAnnotation(),
  isAnnotating: selectIsAnnotating(),
});

export default connect(mapState, mapDispatch)(ImageAnnotations);
