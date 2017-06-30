import React, { PropTypes } from 'react';
import Button from 'components/Button';

const NoneYet = (props) => (
  <div className="center">
    <h1 className="mt0">Get started</h1>
    <div className="bigger2">
      <p>
        Hi there,
      </p>
      It looks like you do not belong to a Seamless organization yet.
      <br />
      Create one!
    </div>
    <div className="mt3">
      <Button label="Create an organization" onclick={props.onClick} icon="plus" lg />
    </div>
  </div>
);

NoneYet.propTypes = {
  onClick: PropTypes.func,
};

export default NoneYet;
