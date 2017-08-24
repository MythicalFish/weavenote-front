import React from 'react';
import PlusButton from 'components/PlusButton';
import AccordionRow from 'components/AccordionRow';

const Accordion = (props) => {
  let items = [];
  if (props.items) {
    items = props.items.map((item, index) => {
      const isCurrent = props.current && props.current === item;
      return (
        <AccordionRow
          {...{ ...props, isCurrent, index, item }}
          key={`component${index}`}
        />
      );
    });
  }
  return (
    <div>
      <PlusButton onClick={props.toggleCreate} />
      <div className="accordion mt2">
        {items.size > 0 ? items : <div className="p2">No items yet</div>}
        {props.footer && props.footer}
      </div>
    </div>
  );
};

export default Accordion;
