import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

const Invite = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <footer className="p2 center">
        <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
      </footer>
    </form>
  );
};

Invite.propTypes = {
  item: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'Invite',
})(Invite);
