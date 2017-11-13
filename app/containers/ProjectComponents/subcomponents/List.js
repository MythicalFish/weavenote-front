import React, { PropTypes } from 'react';
import ListItem from './ListItem';

const List = (props) => {
  const { components } = props;
  return (
    <table className="table-condensed smaller1">
      <colgroup>
        <col width="35%" />
        <col width="35%" />
        <col width="15%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Quantity</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {components.map((component, i) => (
          <ListItem
            key={i}
            component={component}
            material={component.get('material')}
            {...props}
          />
        ))}
      </tbody>
    </table>
  );
};

List.propTypes = {
  components: PropTypes.object,
};

export default List;
