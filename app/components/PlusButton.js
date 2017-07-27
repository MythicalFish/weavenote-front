import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

export default function PlusButton(props) {
  return <Icon graphic="PlusCircle" {...props} color="color2x" />;
}

PlusButton.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
};
