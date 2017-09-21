import React, { PropTypes } from 'react';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import { pixelPosition, relativePosition } from 'utils/anchorPosition';

class NewAnnotation extends React.PureComponent {
  componentDidMount() {
    const { actionVars } = this.props;
    this.props.startAnnotation(actionVars);
  }
  setAnnotation = ({ evt }) => {
    const { setAnnotation, canvasSize, actionVars } = this.props;
    const pos = { x: evt.offsetX, y: evt.offsetY };
    setAnnotation(relativePosition(pos, canvasSize));
    if (actionVars.type === 'dot') {
      console.log('start comment');
    }
  };
  createAnnotation = () => {
    const { image } = this.props;
    this.props.createAnnotation(image);
  };
  anchorStyle = this.props.actionVars.type === 'dot' ? 'default' : 'lineCap';
  render() {
    const { newAnnotation, canvasSize } = this.props;
    const anchors = newAnnotation.get('anchors');
    return (
      <div>
        <Canvas onClick={this.setAnnotation} size={canvasSize}>
          {anchors.size > 1 && <Line {...{ anchors, canvasSize }} />}
          {anchors.map((anchor, index) => (
            <Anchor
              key={`NewAnnotationAnchor${index}`}
              position={pixelPosition(anchor.toJS(), canvasSize)}
              onDragEnd={this.setAnnotation}
              style={this.anchorStyle}
              draggable
              active
            />
          ))}
        </Canvas>
      </div>
    );
  }
}
/*
<div className="canvas-actions">
  <Button
    label="Cancel"
    secondary
    onClick={this.props.cancelAnnotation}
  />
  {newAnnotation.get('maxAnchors') === anchors.size && (
    <Button label="Save annotation" onClick={this.createAnnotation} />
  )}
</div>*/

NewAnnotation.propTypes = {
  image: PropTypes.object,
  canvasSize: PropTypes.object,
  newAnnotation: PropTypes.object,
  setAnnotation: PropTypes.func,
  createAnnotation: PropTypes.func,
  doNothing: PropTypes.func,
  isDoing: PropTypes.func,
  actionVars: PropTypes.object,
  startAnnotation: PropTypes.func,
};

export default NewAnnotation;
