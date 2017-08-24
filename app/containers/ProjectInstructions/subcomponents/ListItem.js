import React, { PropTypes } from 'react';

const ListItem = (props) =>
  <div>
    {props.item.get('title')}
  </div>;

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
