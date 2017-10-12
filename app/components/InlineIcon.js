import React, { PropTypes } from 'react';

export default function InlineIcon(props) {
  return <i className={`fa fa-${props.name} ${props.className || ''}`} />;
}

InlineIcon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
};
