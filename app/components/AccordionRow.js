import React, { PropTypes } from 'react';
import Focusable from 'utils/Focusable';
import AccordionRowHeader from 'components/AccordionRowHeader';

const AccordionRow = (props) => {
  const { item, isCurrent, updateItem, isFocused } = props;
  return (
    <div className="accordion-row">
      <AccordionRowHeader onClick={props.toggleThis}>
        <props.ListItem {...props} />
      </AccordionRowHeader>
      {isFocused &&
        <div className="accordion-row-content">
          <props.Form item={item} onSubmit={updateItem} initialValues={item} />
        </div>}
    </div>
  );
};

AccordionRow.propTypes = {};

export default Focusable(AccordionRow, { disableOutside: true });
