import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import DataRow from 'components/DataRow';

const Create = (props) => {

  const { handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="data-rows">
        <Field name="name" type="text" component={DataRow} label="Name your organization" focus />
        <footer className="p2 center">
          <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
        </footer>
      </div>
    </form>
  );
};

Create.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'Organization',
})(Create);
