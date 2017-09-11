import React, { PropTypes } from 'react';
import Focusable from 'utils/Focusable';
import AccordionRowHeader from 'components/AccordionRowHeader';

const AccordionRow = (props) => {
  const { item, updateItem, isFocused, Form, userRole } = props;
  return (
    <div className="accordion-row">
      <AccordionRowHeader {...props} />
      {isFocused && (
        <div className="accordion-row-content">
          <Form
            item={item}
            onSubmit={updateItem}
            initialValues={item}
            userRole={userRole}
          />
        </div>
      )}
    </div>
  );
};

AccordionRow.propTypes = {
  item: PropTypes.object,
  updateItem: PropTypes.func,
  isFocused: PropTypes.bool,
  userRole: PropTypes.string,
  Form: PropTypes.func,
};

export default Focusable(AccordionRow);
