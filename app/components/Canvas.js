import React, { PropTypes } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

export default function Canvas(props) {
  const { size, onClick } = props;
  delete size.position;
  const Overlay = () => <Rect {...size} onClick={onClick} />;
  return (
    <div className="canvas cursor-crosshair">
      <Stage {...size}>
        <Layer>
          <Overlay />
          {props.children}
        </Layer>
      </Stage>
    </div>
  );
}

Canvas.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  size: PropTypes.object,
};
