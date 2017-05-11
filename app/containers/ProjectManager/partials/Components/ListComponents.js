import React, { PropTypes } from 'react';
import Form from './Form';
import ListItem from './ListItem';

export default function ListComponents(props) {
  const { components, current, switchComponent, handleSubmit, initialValues, toggleCreate } = props;
  let items = [];
  if (components) {
    items = components.toArray().map((component, index) => {
      const isCurrent = current && current.get('id') === component.get('id');
      return (
        <div key={component}>
          <ListItem
            component={component}
            index={index}
            isCurrent={isCurrent}
            switchComponent={switchComponent}
          />
          {isCurrent &&
            <Form
              onSubmit={handleSubmit}
              initialValues={initialValues}
              material={current.get('material')}
            />
          }
        </div>
      );
    });
  }
  return (
    <div>
      <button className="glyph" onClick={toggleCreate}>
        <i className="fa fa-plus-circle"></i>
      </button>
      <div className="data-rows mt2">
        {items.length > 1
          ? items
          : 'No materials yet'
        }
      </div>
    </div>
  );
}

ListComponents.propTypes = {
  components: PropTypes.object,
  current: PropTypes.object,
  switchComponent: PropTypes.func,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  toggleCreate: PropTypes.func,
};
