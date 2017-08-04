import React from 'react';
import InputRow from 'components/FormField';
import PlusButton from 'components/PlusButton';

export default class Accordion extends React.PureComponent {
  handleSubmit = (data) => {
    const { props } = this;
    props.updateItem(data);
  };
  render() {
    let items = [];
    const { props } = this;
    if (props.items) {
      items = props.items.toArray().map((item, index) => {
        const isCurrent = props.current && props.current === item;
        return (
          <div key={`component${index}`}>
            <props.ListItem
              item={item}
              index={index}
              isCurrent={isCurrent}
              switchItem={props.switchItem}
            />
            {isCurrent &&
              <props.Form
                item={item}
                onSubmit={this.handleSubmit}
                initialValues={props.formValues}
              />}
          </div>
        );
      });
    }
    return (
      <div>
        <PlusButton onClick={props.toggleCreate} />
        <div className="data-rows mt2">
          {items.length > 0
            ? items
            : <div className="data-row">
              <div className="p2">No items yet</div>
            </div>}
          {props.footer &&
            <InputRow
              type="display"
              label={props.footer.label}
              value={props.footer.value}
            />}
        </div>
      </div>
    );
  }
}
