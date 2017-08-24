import React, { PropTypes } from 'react';
import Focusable from 'utils/Focusable';
import AccordionRowHeader from 'components/AccordionRowHeader';

const AccordionRow = (props) => {
  const { item, updateItem, isFocused } = props;
  return (
    <div className="accordion-row">
      <AccordionRowHeader onClick={props.toggleThis} isFocused={isFocused}>
        <props.ListItem {...props} />
      </AccordionRowHeader>
      {isFocused &&
        <div className="accordion-row-content">
          <props.Form item={item} onSubmit={updateItem} initialValues={item} />
        </div>}
    </div>
  );
};

AccordionRow.propTypes = {
  item: PropTypes.object,
  updateItem: PropTypes.func,
  toggleThis: PropTypes.func,
  isFocused: PropTypes.bool,
};

export default Focusable(AccordionRow, { disableOutside: true });
