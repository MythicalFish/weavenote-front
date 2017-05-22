import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import DataRow from 'components/DataRow';

export default class SupplierForm extends React.PureComponent {
  render() {
    return (
      <div className="data-rows">
        <header>
          Supplier
        </header>
        <Field name="supplier.name" label="Name" type="text" component={DataRow} />
      </div>
    );
  }
}

SupplierForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
};

