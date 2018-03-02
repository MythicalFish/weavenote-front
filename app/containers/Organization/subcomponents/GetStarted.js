import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Logo from 'images/logo-s.svg';

const GetStarted = (props) => (
  <div className="center">
    <img src={Logo} role="presentation" className="x4" />
    <div className="bigger1 my3">
      It looks like you do not belong to a Weavenote organization yet.
    </div>
    <Button
      label="Create an organization"
      onClick={props.onClick}
      icon="Plus"
      large
    />
  </div>
);

GetStarted.propTypes = {
  onClick: PropTypes.func,
};

export default GetStarted;
