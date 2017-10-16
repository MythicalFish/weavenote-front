import React, { PropTypes } from 'react';

export default class Supplier extends React.PureComponent {
  Tail = (props) => (
    <button
      onClick={() => {
        this.props.newSupplier();
        props.onClick();
      }}
    >
      <i className="fa fa-plus mr1" />
      Add a factory
    </button>
  );

  render() {
    const { selectedType, Field } = this.props;

    const selectorProps = {
      name: 'supplier',
      label: 'Supplier',
      type: 'select',
      component: FormField,
      data: this.props.suppliers,
      tail: this.Tail,
      align: 'right',
      theme: 'alt1',
    };

    return (
      <div>
        <div className="row">
          <Field name="supplier.name" label="Name" c="col-xs-8" />
          <Field name="supplier.ref" label="Ref." c="col-xs-4" />
          <Field name="supplier.email" label="Email" c="col-xs-12" />
          <Field
            name="supplier.country_of_origin"
            label="Country of origin"
            c="col-xs-12"
          />
        </div>
        {['Fabric'].includes(selectedType) && (
          <Field name="supplier.agent" label="Agent" />
        )}
        <Field name="supplier.color_ref" label="Color reference" />
        {['Fabric'].includes(selectedType) && (
          <Field name="supplier.minimum_order" label="Minimum order" />
        )}
        <Field name="supplier.comments" label="Comments" type="textarea" />
      </div>
    );
  }
}

Supplier.propTypes = {
  newSupplier: PropTypes.func,
  suppliers: PropTypes.object,
  selectedType: PropTypes.string,
};
