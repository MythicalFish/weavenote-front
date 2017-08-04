import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import InputRow from 'components/FormInputRow';

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
    const { selectedType, className } = this.props;

    const selectorProps = {
      name: 'supplier',
      label: 'Supplier',
      type: 'select',
      component: InputRow,
      data: this.props.suppliers,
      tail: this.Tail,
      align: 'right',
    };

    return (
      <div className={`data-rows ${className}`}>
        <Field {...selectorProps} />
        <div>
          <Field
            name="supplier.name"
            label="Name"
            type="text"
            component={InputRow}
            focus
          />
          {['Fabric'].includes(selectedType) &&
            <Field
              name="supplier.agent"
              label="Agent"
              type="text"
              component={InputRow}
            />}
          <Field
            name="supplier.ref"
            label="Reference"
            type="text"
            component={InputRow}
          />
          <Field
            name="supplier.color_ref"
            label="Color reference"
            type="text"
            component={InputRow}
          />
          {['Fabric'].includes(selectedType) &&
            <Field
              name="supplier.minimum_order"
              label="Minimum order"
              type="text"
              component={InputRow}
            />}
          <Field
            name="supplier.comments"
            label="Comments"
            type="textarea"
            component={InputRow}
          />
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
