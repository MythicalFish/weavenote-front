import React, { PropTypes } from 'react';
import Dot from 'components/Dot';

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
      <div className="x8 pr0">
        {material.name}
      </div>
      <div className="x7 pr0">
        {material.type.name}
      </div>
      <div className="x7 right-align pr0">
        {material.color.name}
        <Dot className="ml1" color={material.color.hex_code} />
      </div>
      <div className="right-align smaller2 dark2">
        <i className={`fa ${chevronClass}`}></i>
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
