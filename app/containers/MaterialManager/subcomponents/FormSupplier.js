import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import { FormField } from 'components/FormField';

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
    const { selectedType, F } = this.props;

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
        <Field {...selectorProps} />
        <div className="row">
          <div className="col-xs-8">
            <F name="supplier.name" label="Name" />
          </div>
          <div className="col-xs-4">
            <F name="supplier.ref" label="Ref." />
          </div>
          <div className="col-xs-12">
            <F name="supplier.email" label="Email" />
          </div>
          <div className="col-xs-12">
            <F name="supplier.country_of_origin" label="Country of origin" />
          </div>
        </div>
        {['Fabric'].includes(selectedType) && (
          <F name="supplier.agent" label="Agent" />
        )}
        <F name="supplier.color_ref" label="Color reference" />
        {['Fabric'].includes(selectedType) && (
          <F name="supplier.minimum_order" label="Minimum order" />
        )}
        <F name="supplier.comments" label="Comments" type="textarea" />
      </div>
    );
  }
}

Supplier.propTypes = {
  F: PropTypes.func,
  newSupplier: PropTypes.func,
  suppliers: PropTypes.object,
  selectedType: PropTypes.string,
};