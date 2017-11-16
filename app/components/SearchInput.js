import React, { PropTypes } from 'react';
import Input from 'components/FormInput';

function SearchInput(props) {
  const handleSearch = (e) => {
    props.filterAction(e.target.value);
  };
  return (
    <Input
      placeholder="Search"
      onChange={handleSearch}
      disableReduxForm
      style={{ width: '400px' }}
    />
  );
}

SearchInput.propTypes = {
  filterAction: PropTypes.func,
};

export default SearchInput;
