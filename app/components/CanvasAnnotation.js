import React, { PropTypes } from 'react';
import { toggleState } from 'utils/misc';
import { Group } from 'react-konva';
import { pixelPosition, anchorPoints } from 'utils/canvasPosition';
import Anchor from './CanvasAnchor';
import Line from './CanvasLine';
import Text from './CanvasText';

const hiddenStyle = {
  opacity: 0,
  height: 0,
  width: 0,
};

class CanvasAnnotation extends React.PureComponent {
  state = { isHovering: false };
  getPosition = (anchor) => pixelPosition(anchor.toJS(), this.props.canvasSize);
  handleMouseOver = ({ evt }) => {
    toggleState(this, 'isHovering');
    const { onMouseOver } = this.props;
    if (onMouseOver) onMouseOver(evt);
  };
  handleMouseOut = ({ evt }) => {
    toggleState(this, 'isHovering');
    const { onMouseOut } = this.props;
    if (onMouseOut) onMouseOut(evt);
  };
  handleMouseUp = () =>
    this.props.onMouseUp({ position: this.points().midpoint });
  handleAnchorDragEnd = (anchor) => ({ evt: event }) =>
    this.props.handleAnchorDragEnd({ anchor, event });
  handleAnchorMouseOver = () => {
    if (this.props.isDraggable) {
      this.props.canvasRef.setState({ cursor: 'move' });
    }
  };
  handleAnchorMouseOut = () => {
    this.props.canvasRef.setState({ cursor: 'default' });
  };
  style = () => {
    if (this.props.isVisible) return {};
    return hiddenStyle;
  };
  groupProps = () => ({
    ...this.style(),
    onMouseOver: this.handleMouseOver,
    onMouseOut: this.handleMouseOut,
    onMouseUp: this.handleMouseUp,
  });
  isActive = () => this.props.isActive || this.state.isHovering;
  points = () => {
    const { anchors, canvasSize } = this.props;
    return anchorPoints(anchors, canvasSize);
  };
  render() {
    const { anchors, identifier, theme } = this.props;
    const points = this.points();
    return (
      <Group {...this.groupProps()}>
        {anchors.size > 1 && (
          <Line
            points={points.lineAnchors}
            theme={theme}
            isActive={this.isActive()}
          />
        )}
        {anchors.map((anchor, i) => (
          <Anchor
            key={`Anchor${i}`}
            theme={theme}
            position={this.getPosition(anchor)}
            onDragStart={this.props.handleAnchorDragStart}
            onDragEnd={this.handleAnchorDragEnd(anchor)}
            isDraggable={this.props.isDraggable}
            isActive={this.isActive()}
            onMouseOver={this.handleAnchorMouseOver}
            onMouseOut={this.handleAnchorMouseOut}
          />
        ))}
        {identifier && (
          <Text
            value={identifier}
            position={points.midpoint}
            isActive={this.isActive()}
          />
        )}
      </Group>
    );
  }
}

CanvasAnnotation.propTypes = {
  isVisible: PropTypes.bool,
  isActive: PropTypes.bool,
  isDraggable: PropTypes.bool,
  theme: PropTypes.string,
  identifier: PropTypes.string,
  canvasSize: PropTypes.object,
  canvasRef: PropTypes.object,
  anchors: PropTypes.object,
  onMouseUp: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  handleAnchorDragEnd: PropTypes.func,
  handleAnchorDragStart: PropTypes.func,
};

export default CanvasAnnotation;
