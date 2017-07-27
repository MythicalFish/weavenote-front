import React from 'react';

export default function InlineIcon(props) {
  return <i className={`fa fa-${props.name} ${props.className || ''}`} />;
}

InlineIcon.propTypes = {
  name: React.PropTypes.string,
  className: React.PropTypes.string,
};
