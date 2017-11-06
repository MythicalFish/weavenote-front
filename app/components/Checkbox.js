import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const Checkbox = ({ checked, onClick, label, readOnly }) => {
  const opts = {
    name: 'Square',
    size: 20,
    color: 'dark3',
  };
  if (checked) Object.assign(opts, { color: 'poiple', name: 'CheckSquare' });
  if (onClick) opts.onClick = onClick;
  if (readOnly) {
    opts.onClick = null;
    opts.className = 'cursor-default';
  }

  if (label) {
    return (
      <div className="flex items-center">
        <Icon {...opts} />
        <div className="ml1">{label}</div>
      </div>
    );
  }
  return <Icon {...opts} />;
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  readOnly: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
};

export default Checkbox;
