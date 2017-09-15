import React, { PropTypes } from 'react';
import Focusable from 'utils/Focusable';
import Icon from 'components/Icon';

const AccordionRow = (props) => {
  const {
    item,
    RowHeader,
    updateItem,
    isFocused,
    toggleThis,
    Form,
    userRole,
  } = props;
  const chevronClass = isFocused ? 'ChevronUp' : 'ChevronDown';
  const Chevron = () => <Icon name={chevronClass} color="dark3" size={20} />;
  const ToggleArea = ({ children }) => (
    <button className="flex-auto" type="button" onClick={toggleThis}>
      {children}
    </button>
  );
  return (
    <div className="accordion-row">
      <RowHeader {...{ ...props, Chevron, ToggleArea }} />
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
  toggleThis: PropTypes.func,
  isFocused: PropTypes.bool,
  RowHeader: PropTypes.func,
  userRole: PropTypes.string,
  Form: PropTypes.func,
};

export default Focusable(AccordionRow, { delay: 0 });
