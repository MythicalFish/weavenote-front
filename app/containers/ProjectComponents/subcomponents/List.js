import React, { PropTypes } from 'react';
import ListItem from './ListItem';

const List = (props) => {
  const { components } = props;
  return (
    <div>
      {components.map((component) => (
        <ListItem
          key={component}
          component={component}
          material={component.get('material')}
          {...props}
        />
      ))}
    </div>
  );
};

List.propTypes = {
  components: PropTypes.object,
};

export default List;
