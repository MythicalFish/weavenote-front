import React, { PropTypes } from 'react';

export default class Supplier extends React.PureComponent {
  render() {
    const { Field } = this.props;
    return (
      <div className="row">
        <Field name="supplier_name" label="Supplier" c="col-xs-12 mb2" />
        <Field name="supplier_email" type="email" label="Email" c="col-xs-12" />
      </div>
    );
  }
}

Supplier.propTypes = {
  Field: PropTypes.func,
};
