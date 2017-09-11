import React, { PropTypes } from 'react';

const ListItem = ({ item, Chevron }) => (
  <div>
    <div className="pr1">{item.get('title')}</div>
    <div>
      <Chevron />
      <div className="">x</div>
    </div>
  </div>
);

ListItem.propTypes = {
  item: PropTypes.object,
  Chevron: PropTypes.func,
};

export default ListItem;
