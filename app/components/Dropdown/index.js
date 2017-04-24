/**
*
* Dropdown
*
*/

import React from 'react';
// import styled from 'styled-components';


function Dropdown() {
  return (
    <div className="dropdown">
      <input type="checkbox" id="d2" />
      <label htmlFor="d2">
        Dekkingsgebied
        <div>Wereld</div>
      </label>
      <div className="dropdown-content x20 sm-x30 center">
        <input type="radio" name="dekkingsgebied" value="wereld" id="opt-w" checked />
        <input type="radio" name="dekkingsgebied" value="nederland" id="opt-nl" />
        <input type="radio" name="dekkingsgebied" value="europa" id="opt-eu" />
        <div className="row">
          <label htmlFor="opt-w" className="col-xs-4">Wereld</label>
          <label htmlFor="opt-nl" className="col-xs-4">Nederland</label>
          <label htmlFor="opt-eu" className="col-xs-4">Europa</label>
        </div>
      </div>
    </div>
  );
}

Dropdown.propTypes = {

};

export default Dropdown;
