import React from 'react';
import DataRow from 'components/DataRow';
import Price from 'components/Price';
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
                component={component}
                onSubmit={this.handleSubmit}
                initialValues={props.formValues}
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
            : <div className="p2">No materials yet</div>
          }
          <DataRow
            type="display"
            label="Material cost"
            value={(<Price value={props.project.material_cost} />)}
          />
        </div>
      </div>
    );
  }
}

