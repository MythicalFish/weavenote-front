import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

export default function PlusButton(props) {
  const bProps = { ...props };
  bProps.color = props.color || 'color2x';
  return <Icon name="PlusCircle" {...bProps} />;
}

PlusButton.propTypes = {
  color: PropTypes.string,
};
