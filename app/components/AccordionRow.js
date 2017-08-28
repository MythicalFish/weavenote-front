import React, { PropTypes } from 'react';
import Focusable from 'utils/Focusable';
import AccordionRowHeader from 'components/AccordionRowHeader';

const AccordionRow = (props) => {
  const { item, updateItem, isFocused, ListItem, Form, userRole } = props;
  return (
    <div className="accordion-row">
      <AccordionRowHeader onClick={props.toggleThis} isFocused={isFocused}>
        <ListItem {...props} />
      </AccordionRowHeader>
      {isFocused &&
        <div className="accordion-row-content">
          <Form
            item={item}
            onSubmit={updateItem}
            initialValues={item}
            userRole={userRole}
          />
        </div>}
    </div>
  );
};

AccordionRow.propTypes = {
  item: PropTypes.object,
  ListItem: PropTypes.func,
  updateItem: PropTypes.func,
  toggleThis: PropTypes.func,
  isFocused: PropTypes.bool,
  userRole: PropTypes.string,
  Form: PropTypes.func,
};

export default Focusable(AccordionRow);
