import React, { PropTypes } from 'react';

const AccordionItem = (props) => {
  const { switchItem, isCurrent, index } = props;
  let chevronClass = 'fa-chevron-down';
  let switchTarget = index;
  if (isCurrent) {
    chevronClass = 'fa-chevron-up';
    switchTarget = null;
  }
  return (
    <button type="button" className="data-row left-align p2" onClick={() => { switchItem(switchTarget); }}>
      {props.children}
      <div className="right-align smaller2 dark2">
        <i className={`fa ${chevronClass}`}></i>
      </div>
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
