import React, { PropTypes } from 'react';
import { toggleState } from 'utils/misc';
import { Group } from 'react-konva';
import { pixelPosition, anchorPoints } from 'utils/canvasPosition';
import Anchor from './Anchor';
import Line from './Line';
import Arrow from './Arrow';
import Label from './Label';

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
  points = () => {
    const { anchors, canvasSize } = this.props;
    return anchorPoints(anchors, canvasSize);
  };
  render() {
    const { anchors, identifier, type, isNew, label } = this.props;
    const { lineAnchors: points, midpoint } = this.points();
    const isActive = this.props.isActive || this.state.isHovering;
    const objects = [];
    if (anchors.size > 1) {
      const lProps = { key: type, type, points, isActive };
      switch (type) {
        case 'arrow':
          objects.push(<Arrow {...lProps} />);
          break;
        default:
          objects.push(<Line {...lProps} />);
          break;
      }
    }
    anchors.forEach((anchor, i) => {
      objects.push(
        <Anchor
          key={`Anchor${i}`}
          type={type}
          isActive={isActive}
          isNew={isNew}
          position={this.getPosition(anchor)}
          isDraggable={this.props.isDraggable}
          handleDragStart={this.props.handleAnchorDragStart}
          handleDragEnd={this.handleAnchorDragEnd(anchor)}
          handleMouseOver={this.handleAnchorMouseOver}
          handleMouseOut={this.handleAnchorMouseOut}
        />
      );
    });
    if (label) {
      objects.push(
        <Label
          key="txt"
          value={label}
          position={midpoint}
          isActive={isActive}
        />
      );
    }
    return (
      <Group {...this.groupProps()}>
        {objects}
        {identifier && (
          <Text
            value={identifier}
            position={points.midpoint}
            isActive={isActive}
          />
        )}
      </Group>
    );
  }
}

CanvasAnnotation.propTypes = {
  isNew: PropTypes.bool,
  isVisible: PropTypes.bool,
  isActive: PropTypes.bool,
  isDraggable: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
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
