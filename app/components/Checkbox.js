import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const Checkbox = ({ checked }) => {
  if (checked) return <Icon name="CheckSquare" size={20} color="poiple" />;
  return <Icon name="Square" size={20} color="dark3" />;
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
};

export default Checkbox;
