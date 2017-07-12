import React, { PropTypes } from 'react';
import Glyph from 'components/Glyph';

export default function PlusButton(props) {
  return <Glyph icon="plus-circle" {...props} />;
}

PlusButton.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
};
