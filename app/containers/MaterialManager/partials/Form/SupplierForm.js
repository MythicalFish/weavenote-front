import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import DataRow from 'components/DataRow';

export default class SupplierForm extends React.PureComponent {

  state = { creating: false }

  toggleState = () => {
    this.setState({ creating: !this.state.creating });
  }

  render() {
    return (
      <div className="data-rows">
        <header>
          Supplier
        </header>
        {!this.state.creating
          <div>
            <Field name="supplier.id" label="Supplier" type="select" component={DataRow} data={this.props.suppliers} />
            <button className="btn" onClick={this.toggleState}>Create a supplier</button>
          </div>
        }
        {this.state.creating &&
          <div>
            <Field name="supplier.name" label="Name" type="text" component={DataRow} />
            <Field name="supplier.agent" label="Agent" type="text" component={DataRow} />
            <Field name="supplier.name_ref" label="Name ref." type="text" component={DataRow} />
            <Field name="supplier.color_ref" label="Color ref." type="text" component={DataRow} />
            <Field name="supplier.minimum_order" label="Minimum order" type="text" component={DataRow} />
            <Field name="supplier.comments" label="Comments" type="textarea" component={DataRow} />
          </div>
        }
      </div>
    );
  }
}

SupplierForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  suppliers: PropTypes.array,
};

