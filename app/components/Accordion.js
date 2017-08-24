import React, { PropTypes } from 'react';
import AccordionRow from 'components/AccordionRow';

const Accordion = (props) => {
  let items = [];
  if (props.items) {
    items = props.items.map((item, index) =>
      //
      <AccordionRow {...{ ...props, item }} key={`component${index}`} />
    );
  }
  return (
    <div className="accordion mt2">
      {items.size > 0 ? items : <div className="p2">No items yet</div>}
      {props.footer && props.footer}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.object,
  footer: PropTypes.node,
};

export default Accordion;
