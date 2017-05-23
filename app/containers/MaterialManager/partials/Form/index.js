import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import SupplierForm from './SupplierForm';

class Form extends React.Component {

  state = {
    // Defaults
    selectedType: 'Fabric',
  }

  componentWillMount = () => {
    const { initialValues } = this.props;
    const v = initialValues.toJS();
    if (v.type) {
      this.setState({ selectedType: v.type.name });
    }
  }

  switchType = (type) => {
    this.setState({ selectedType: type.name });
  }

  render() {
    const { handleSubmit, submitting, types, colors, currencies, suppliers, newSupplier, switchSupplier } = this.props;
    const { selectedType } = this.state;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="data-rows mb2">
              <Field name="type" type="select" component={DataRow} label="Type" data={types} onChanged={this.switchType} />
              <Field name="name" type="text" component={DataRow} label="Name" />
              <Field name="identifier" type="text" component={DataRow} label="Identifier" />
              <Field name="color" type="select" component={DataRow} label="Color" data={colors} />
              {selectedType === 'Fabric' &&
                <Field name="composition" type="text" component={DataRow} label="Composition" />
              }
            </div>
            <div className="data-rows">
              <Field name="currency" type="select" component={DataRow} label="Currency" data={currencies} />
              <Field name="cost_base" type="text" component={DataRow} label="Base cost" />
              <Field name="cost_delivery" type="text" component={DataRow} label="Delivery cost" />
              <Field name="cost_extra1" type="text" component={DataRow} label="Extra cost 1" />
              <Field name="cost_extra2" type="text" component={DataRow} label="Extra cost 2" />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <SupplierForm {...{ suppliers, newSupplier, switchSupplier }} />
          </div>
        </div>
        <footer className="p2 center">
          <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
        </footer>
      </form>
    );
  }
}

Form.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  newSupplier: PropTypes.func,
  switchSupplier: PropTypes.func,
  types: PropTypes.array,
  colors: PropTypes.array,
  currencies: PropTypes.array,
  suppliers: PropTypes.array,
  initialValues: PropTypes.object,
};

export default reduxForm({
  form: 'Material',
})(Form);
