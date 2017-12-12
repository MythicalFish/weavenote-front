import React, { PropTypes } from 'react';
import { Text, Group } from 'react-konva';
import { textStyle } from './utils';

export default function CanvasText(props) {
  const { value, position } = props;
  const style = textStyle(props);
  return (
    <Group {...position}>
      <Text offsetY={25} text={value} {...style} />
    </Group>
  );
}

CanvasText.propTypes = {
  value: PropTypes.string,
  position: PropTypes.object,
};
