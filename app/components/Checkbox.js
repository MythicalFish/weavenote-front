import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const Checkbox = ({ checked, onClick }) => {
  const opts = {
    name: 'Square',
    size: 20,
    color: 'dark3',
  };
  if (checked) Object.assign(opts, { color: 'poiple', name: 'CheckSquare' });
  if (onClick) opts.onClick = onClick;
  return <Icon {...opts} />;
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
};

export default Checkbox;
