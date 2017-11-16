import React, { PropTypes } from 'react';
import UserMenu from 'components/UserMenu';
import SearchInput from 'components/SearchInput';

export default function Toolbar(props) {
  return (
    <header id="app-header" className="justify-between">
      <div />
      <div>
        <SearchInput filterAction={props.filterProjects} />
      </div>
      <UserMenu />
    </header>
  );
}

Toolbar.propTypes = {
  filterProjects: PropTypes.func,
};
