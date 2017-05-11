import React, { PropTypes } from 'react';

export default function CreateComponent(props) {
  const { toggleCreate } = props;
  return (
    <div>
      Create
      <button className="btn-shy" onClick={toggleCreate}>
        Cancel
      </button>
    </div>
  );
}

CreateComponent.propTypes = {
  toggleCreate: PropTypes.func,
};
