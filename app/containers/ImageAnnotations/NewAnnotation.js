import React, { PropTypes } from 'react';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import { pixelPosition, relativePosition } from 'utils/anchorPosition';

class NewAnnotation extends React.PureComponent {
  componentDidMount() {
    const { actionVars } = this.props;
    this.props.setAnnotation(actionVars);
  }
  setAnchor = ({ evt }) => {
    const { setAnchor, canvasSize, actionVars } = this.props;
    const pos = { x: evt.offsetX, y: evt.offsetY };
    setAnchor(relativePosition(pos, canvasSize));
    if (actionVars.type === 'dot') this.props.writeComment();
  };
  anchorStyle = this.props.actionVars.type === 'dot' ? 'default' : 'lineCap';
  render() {
    const { newAnnotation, canvasSize } = this.props;
    const anchors = newAnnotation.get('anchors');
    return (
      <Canvas onClick={this.setAnchor} size={canvasSize}>
        {anchors.size > 1 && <Line {...{ anchors, canvasSize }} />}
        {anchors.map((anchor, index) => (
          <Anchor
            key={`NewAnnotationAnchor${index}`}
            position={pixelPosition(anchor.toJS(), canvasSize)}
            onDragEnd={this.setAnchor}
            style={this.anchorStyle}
            draggable
            active
          />
        ))}
      </Canvas>
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
    <Button label="Save annotation" onClick={this.props.createAnnotation} />
  )}
</div>*/

NewAnnotation.propTypes = {
  canvasSize: PropTypes.object,
  newAnnotation: PropTypes.object,
  setAnchor: PropTypes.func,
  createAnnotation: PropTypes.func,
  setAnnotation: PropTypes.func,
  actionVars: PropTypes.object,
  startAnnotation: PropTypes.func,
  writeComment: PropTypes.func,
};

export default NewAnnotation;
