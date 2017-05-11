import React, { PropTypes } from 'react';
import Form from './Form';
import ListItem from './ListItem';

export default function ListComponents(props) {
  const { components, current, switchTo, handleSubmit, initialValues, toggleCreate } = props;
  let items = [];
  if (components) {
    items = components.toJS().map((component) => {
      const isCurrent = current && current.id === component.id;
      return (
        <div key={`component-${component.id}`}>
          <ListItem
            component={component}  
            isCurrent={isCurrent}
            switchTo={switchTo}
          />
          {isCurrent &&
            <Form
              onSubmit={handleSubmit}
              initialValues={initialValues}
              material={current.material}
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
  switchTo: PropTypes.func,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  toggleCreate: PropTypes.func,
};
