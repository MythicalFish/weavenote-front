import React, { PropTypes } from 'react';
import Input from 'components/FormInput';

function SearchInput(props) {
  const handleSearch = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <Input
      medium
      fieldClass="inline-block"
      className="search-input"
      placeholder="Search"
      onChange={handleSearch}
      disableReduxForm
      style={{ width: '440px' }}
      icon={{ name: 'Search', size: 15 }}
    />
  );
}

SearchInput.propTypes = {
  onChange: PropTypes.func,
};

export default SearchInput;
