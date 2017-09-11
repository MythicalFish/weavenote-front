import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const AccordionRowHeader = (props) => {
  const { isFocused, ListItem, toggleThis } = props;
  let chevronClass = 'ChevronDown';
  if (isFocused) {
    chevronClass = 'ChevronUp';
  }
  const Chevron = () => <Icon name={chevronClass} color="dark3" size={20} />;
  return (
    <button type="button" className="accordion-row-header" onClick={toggleThis}>
      <ListItem {...props} Chevron={Chevron} />
    </button>
  );
};

AccordionRowHeader.propTypes = {
  toggleThis: PropTypes.func,
  isFocused: PropTypes.bool,
  ListItem: PropTypes.func,
};

export default AccordionRowHeader;
