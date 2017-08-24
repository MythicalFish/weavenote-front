import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const AccordionItem = (props) => {
  const { switchItem, isCurrent, index } = props;
  let chevronClass = 'ChevronDown';
  let switchTarget = index;
  if (isCurrent) {
    chevronClass = 'ChevronUp';
    switchTarget = null;
  }
  return (
    <button
      type="button"
      className="accordion-row-header"
      onClick={() => {
        switchItem(switchTarget);
      }}
    >
      <div className="pr1">
        {props.children}
      </div>
      <Icon name={chevronClass} color="dark3" size={20} />
    </button>
  );
};

AccordionItem.propTypes = {
  index: PropTypes.number,
  switchItem: PropTypes.func,
  isCurrent: PropTypes.bool,
  children: PropTypes.node,
};

export default AccordionItem;
