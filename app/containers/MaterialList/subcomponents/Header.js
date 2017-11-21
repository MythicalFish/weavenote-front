import React, { PropTypes } from 'react';
import UserMenu from 'components/UserMenu';
import SearchInput from 'components/SearchInput';

export default function Header(props) {
  return (
    <header
      id="app-header"
      className="justify-end relative"
      style={props.style}
    >
      <div className="overlay flex items-center justify-center">
        <div className="flex-none">
          <SearchInput onChange={props.filterMaterials} />
        </div>
      </div>
      <UserMenu />
    </header>
  );
}

Header.propTypes = {
  filterMaterials: PropTypes.func,
  style: PropTypes.object,
};
