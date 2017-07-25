import React from 'react';
import { Layer, Rect, Stage } from 'react-konva';

export default function Canvas(props) {
  const Overlay = () =>
    <Rect width={1000} height={1000} onClick={props.onClick} />;
  return (
    <div className="canvas cursor-crosshair">
      <Stage width={1000} height={1000}>
        <Layer>
          <Overlay />
          {props.children}
        </Layer>
      </Stage>
    </div>
  );
}

Canvas.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
};
