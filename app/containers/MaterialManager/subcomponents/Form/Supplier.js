import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import FocusableField, { FormField } from 'components/FormField';

export default class Supplier extends React.PureComponent {
  Tail = (props) =>
    <button
      onClick={() => {
        this.props.newSupplier();
        props.onClick();
      }}
    >
      <i className="fa fa-plus mr1" />
      Create a supplier
    </button>;

  render() {
    const { selectedType, className, restricted } = this.props;

    const selectorProps = {
      name: 'supplier',
      label: 'Supplier',
      type: 'select',
      component: FormField,
      data: this.props.suppliers,
      tail: this.Tail,
      align: 'right',
      style: 'alt1',
    };

    const F = (fProps) => {
      const p = { ...fProps };
      p.component = FocusableField;
      p.style = 'alt1';
      return <Field {...{ restricted, ...p }} />;
    };

    return (
      <div className={`data-rows ${className}`}>
        <Field {...selectorProps} />
        <div>
          <F name="supplier.name" label="Name" />
          {['Fabric'].includes(selectedType) &&
            <F name="supplier.agent" label="Agent" />}
          <F name="supplier.ref" label="Reference" />
          <F name="supplier.color_ref" label="Color reference" />
          {['Fabric'].includes(selectedType) &&
            <F name="supplier.minimum_order" label="Minimum order" />}
          <F name="supplier.comments" label="Comments" type="textarea" />
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
  restricted: PropTypes.bool,
  reset: PropTypes.func,
  suppliers: PropTypes.object,
  selectedType: PropTypes.string,
  className: PropTypes.string,
};
