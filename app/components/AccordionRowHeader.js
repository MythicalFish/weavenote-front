import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const AccordionRowHeader = (props) => {
  const { isFocused } = props;
  let chevronClass = 'ChevronDown';
  if (isFocused) {
    chevronClass = 'ChevronUp';
  }
  return (
    <button
      type="button"
      className="accordion-row-header"
      onClick={props.onClick}
    >
      <div className="pr1">
        {props.children}
      </div>
      <Icon name={chevronClass} color="dark3" size={20} />
    </button>
  );
};

AccordionRowHeader.propTypes = {
  onClick: PropTypes.func,
  isFocused: PropTypes.bool,
  children: PropTypes.node,
};

export default AccordionRowHeader;
