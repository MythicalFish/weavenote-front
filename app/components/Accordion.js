import React from 'react';
import PlusButton from 'components/PlusButton';

export default class Accordion extends React.PureComponent {
  render() {
    let items = [];
    const { props } = this;
    if (props.items) {
      items = props.items.toArray().map((item, index) => {
        const isCurrent = props.current && props.current === item;
        return (
          <div key={`component${index}`} className="accordion-row">
            <props.ListItem
              item={item}
              index={index}
              isCurrent={isCurrent}
              switchItem={props.switchItem}
            />
            {isCurrent &&
              <div className="accordion-row-content">
                <props.Form
                  item={item}
                  onSubmit={props.updateItem}
                  initialValues={props.formValues}
                />
              </div>}
          </div>
        );
      });
    }
    return (
      <div>
        <PlusButton onClick={props.toggleCreate} />
        <div className="accordion mt2">
          {items.length > 0 ? items : <div className="p2">No items yet</div>}
          {props.footer && props.footer}
        </div>
      </div>
    );
  }
}
