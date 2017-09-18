import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import confirm from 'utils/confirm';

const DeleteButton = ({ onClick, className, resourceName }) => (
  <Icon
    name="Trash"
    size={15}
    onClick={() =>
      confirm(
        `Are you sure you want to delete this ${resourceName}?`
      ).then(() => {
        onClick();
      })}
    className={`opa5 on-hover ${className}`}
  />
);

DeleteButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  resourceName: PropTypes.string,
};

export default DeleteButton;
