import React, { PropTypes } from 'react';
import { Label, Tag, Text } from 'react-konva';
import { textStyle } from './utils';

export default function CanvasLabel(props) {
  const { value, position } = props;
  const style = textStyle(props);
  return (
    <Label {...position}>
      <Tag fill="#000" opacity={0.5} cornerRadius={3} />
      <Text text={value} {...style} />
    </Label>
  );
}

CanvasLabel.propTypes = {
  value: PropTypes.string,
  position: PropTypes.object,
};
