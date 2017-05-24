import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import DataRow from 'components/DataRow';

export default class Supplier extends React.PureComponent {

  Tail = (props) => (
    <li onClick={() => { this.props.newSupplier(); props.onClick(); }}>
      <i className="fa fa-plus mr1"></i>
      Create a supplier
    </li>
  )

  render() {
    const { selectedType, className } = this.props;

    const selectorProps = {
      name: 'supplier',
      label: 'Supplier',
      type: 'select',
      component: DataRow,
      data: this.props.suppliers,
      tail: this.Tail,
    };

    return (
      <div className={`data-rows ${className}`}>
        <Field {...selectorProps} />
        <div>
          <Field name="supplier.name" label="Name" type="text" component={DataRow} focus />
          {['Fabric'].includes(selectedType) &&
            <Field name="supplier.agent" label="Agent" type="text" component={DataRow} /> }
          <Field name="supplier.ref" label="Reference" type="text" component={DataRow} />
          <Field name="supplier.color_ref" label="Color reference" type="text" component={DataRow} />
          {['Fabric'].includes(selectedType) &&
            <Field name="supplier.minimum_order" label="Minimum order" type="text" component={DataRow} /> }
          <Field name="supplier.comments" label="Comments" type="textarea" component={DataRow} />
        </div>
      </div>
    );
  }
}

Supplier.propTypes = {
  handleSubmit: PropTypes.func,
  newSupplier: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  suppliers: PropTypes.object,
  selectedType: PropTypes.string,
  className: PropTypes.string,
};

