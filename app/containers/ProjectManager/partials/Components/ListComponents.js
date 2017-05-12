import React from 'react';
import Form from './Form';
import ListItem from './ListItem';

export default class ListComponents extends React.PureComponent {
  handleSubmit = (data) => {
    const { props } = this;
    props.updateComponent(data);
  }
  render() {
    let items = [];
    const { props } = this;
    if (props.components) {
      items = props.components.toArray().map((component, index) => {
        const isCurrent = props.current && props.current === component;
        return (
          <div key={component}>
            <ListItem
              component={component}
              index={index}
              isCurrent={isCurrent}
              switchComponent={props.switchComponent}
            />
            {isCurrent &&
              <Form
                onSubmit={this.handleSubmit}
                initialValues={props.formValues}
                material={props.current.get('material')}
              />
            }
          </div>
        );
      });
    }
    return (
      <div>
        <button className="glyph" onClick={props.toggleCreate}>
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
}

