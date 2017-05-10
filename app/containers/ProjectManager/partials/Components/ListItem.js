import React, { PropTypes } from 'react';

const ListItem = (props) => {
  const { component, switchTo, isCurrent } = props;
  let chevronClass = 'fa-chevron-down';
  let switchTarget = component;
  if (isCurrent) {
    chevronClass = 'fa-chevron-up';
    switchTarget = null;
  }
  return (
    <button className="data-row left-align" onClick={() => { switchTo(switchTarget); }}>
      <div className="x8">
        {component.material.name}
      </div>
      <div className="x7">
        {component.material.type.name}
      </div>
      <div className="x7">
        {component.material.color.name}
      </div>
      <div className="right-align">
        <i className={`fa ${chevronClass} gray`}></i>
      </div>
    </button>
  );
};

ListItem.propTypes = {
  component: PropTypes.object,
  switchTo: PropTypes.func,
  isCurrent: PropTypes.bool,
};

export default ListItem;
