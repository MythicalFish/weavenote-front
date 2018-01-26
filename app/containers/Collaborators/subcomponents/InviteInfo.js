import React, { PropTypes } from 'react';

const InviteInfo = ({ type }) => (
  <div className="subtle mt3">
    <div className="mb1 bold">Information regarding roles:</div>
    <ul>
      {type === 'Project' && [
        <li>{"Guests can't see anything related to pricing"}</li>,
        <li>{"Guests can't modify or add anything except comments"}</li>,
        <li>
          {"Users invited only to this project can't see other projects"}
        </li>,
      ]}
      {type === 'Organization' && [
        <li>{'Users invited to this organization can see all projects'}</li>,
        <li>Admins can update organization & billing information</li>,
      ]}
    </ul>
  </div>
);

InviteInfo.propTypes = {
  type: PropTypes.string,
};

export default InviteInfo;
