import React, { PropTypes } from 'react';

const NoneYet = (props) => (
  <div>
    Looks like you do not belong to a Seamless organization yet.
    <div className="mt2">
      <button type="button" className="btn-color2x" onClick={props.onClick}>
        <i className="fa fa-plus mr1"></i>
        Create an organization
      </button>
    </div>
  </div>
);

NoneYet.propTypes = {
  onClick: PropTypes.func,
};

export default NoneYet;
