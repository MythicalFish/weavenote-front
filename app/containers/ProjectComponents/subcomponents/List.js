import React, { PropTypes } from 'react';
import ListItem from './ListItem';

const List = (props) => {
  const { components } = props;
  return (
    <table className="table-condensed">
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
