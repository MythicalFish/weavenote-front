import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import Button from 'components/Button';

const Create = (props) => {
  const { handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Your Weavenote Organization</h1>
      <div className="data-rows">
        <Field
          name="name"
          type="text"
          component={DataRow}
          label="Name your organization"
          focus
        />
        <footer className="p2 center">
          <Button
            type="submit"
            disabled={submitting}
            label="Create"
            icon="Plus"
            lg
          />
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
