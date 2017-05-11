import React, { PropTypes } from 'react';

const ListItem = (props) => {
  const { component, switchComponent, isCurrent, index } = props;
  const material = component.get('material').toJS();
  let chevronClass = 'fa-chevron-down';
  let switchTarget = index;
  if (isCurrent) {
    chevronClass = 'fa-chevron-up';
    switchTarget = null;
  }
  return (
    <button className="data-row left-align" onClick={() => { switchComponent(switchTarget); }}>
      <div className="x8">
        {material.name}
      </div>
      <div className="x7">
        {material.type.name}
      </div>
      <div className="x7">
        {material.color.name}
      </div>
      <div className="right-align">
        <i className={`fa ${chevronClass} gray`}></i>
      </div>
    </button>
  );
};

ListItem.propTypes = {
  index: PropTypes.number,
  component: PropTypes.object,
  switchComponent: PropTypes.func,
  isCurrent: PropTypes.bool,
};

export default ListItem;
