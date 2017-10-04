import React, { PropTypes } from 'react';
import { idToIndex } from 'utils/reducerHelpers';
import { toggleState } from 'utils/misc';
import { Group } from 'react-konva';
import { getPosition, pixelPosition } from 'utils/canvasPosition';
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
  mouseOver = ({ evt }) => {
    toggleState(this, 'isHovering');
    const { onMouseOver } = this.props;
    if (onMouseOver) onMouseOver(evt);
  };
  mouseOut = ({ evt }) => {
    toggleState(this, 'isHovering');
    const { onMouseOut } = this.props;
    if (onMouseOut) onMouseOut(evt);
  };
  mouseUp = ({ evt }) => this.props.onMouseUp(evt);
  handleAnchorDragEnd = (anchor) => ({ evt: e }) => {
    const anchorID = anchor.get('id');
    const anchorIndex = idToIndex(anchorID, this.props.anchors);
    const newPos = getPosition(e, this.props.canvasSize);
    this.props.handleAnchorDragEnd(anchorIndex, newPos);
  };
  style = () => {
    if (this.props.isVisible) return {};
    return hiddenStyle;
  };
  groupProps = () => ({
    ...this.style(),
    onMouseOver: this.mouseOver,
    onMouseOut: this.mouseOut,
    onMouseUp: this.mouseUp,
  });
  render() {
    const { id, anchors, identifier } = this.props;
    const lineAnchorPoints = [];
    const midpoint = { x: 0, y: 0 };
    anchors.forEach((anchor) => {
      const pos = this.getPosition(anchor);
      lineAnchorPoints.push(pos.x);
      lineAnchorPoints.push(pos.y);
      midpoint.x += pos.x;
      midpoint.y += pos.y;
    });
    midpoint.x /= 2;
    midpoint.y /= 2;
    return (
      <Group {...this.groupProps()}>
        {anchors.size > 1 && (
          <Line key={`Annotation${id}Line`} points={lineAnchorPoints} />
        )}
        {anchors.map((anchor, i) => (
          <Anchor
            key={`Annotation${id}Anchor${i}`}
            theme={this.props.theme}
            position={this.getPosition(anchor)}
            onDragStart={this.props.handleAnchorDragStart}
            onDragEnd={this.handleAnchorDragEnd(anchor)}
            isDraggable={this.props.isDraggable}
            isFocused={this.props.isFocused}
            parentIsHovering={this.state.isHovering}
          />
        ))}
        {identifier && <Text value={identifier} position={midpoint} />}
      </Group>
    );
  }
}

CanvasAnnotation.propTypes = {
  isFocused: PropTypes.bool,
  isVisible: PropTypes.bool,
  isDraggable: PropTypes.bool,
  id: PropTypes.number,
  theme: PropTypes.string,
  identifier: PropTypes.string,
  canvasSize: PropTypes.object,
  anchors: PropTypes.object,
  onMouseUp: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  handleAnchorDragEnd: PropTypes.func,
  handleAnchorDragStart: PropTypes.func,
};

export default CanvasAnnotation;
