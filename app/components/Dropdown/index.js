/**
*
* Dropdown
*
*/

import React from 'react';

class Dropdown extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { id, label, links } = this.props;
    return (
      <div className="dropdown">
        <label>
          {label}
        </label>
        <div className="dropdown-content x20 sm-x30 center">

        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  links: React.PropTypes.array.isRequired,
};

export default Dropdown;
