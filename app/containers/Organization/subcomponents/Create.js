import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import Field from 'components/FormField';
import Button from 'components/Button';

const Create = (props) => {
  const { handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit} className="center">
      <h2 className="h3 mb3">New organization</h2>
      <div className="data-rows">
        <Field
          name="name"
          type="text"
          label="Give it a name"
          focus
          theme="alt1"
        />
        <footer className="p2">
          <Button
            type="submit"
            disabled={submitting}
            label="Create"
            icon="Plus"
            large
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
