import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import Supplier from './Supplier';
import CareLabels from './CareLabels';

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
    const {
      handleSubmit, submitting, types, colors, currencies, labels, suppliers, newSupplier,
      addCareLabel, removeCareLabel,
    } = this.props;
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
              {['Button', 'Zip'].includes(selectedType) &&
                <Field name="size" type="text" component={DataRow} label="Size" />
              }
              {selectedType === 'Zip' &&
                <div>
                  <Field name="length" type="text" component={DataRow} label="Length" />
                  <Field name="subtype" type="text" component={DataRow} label="Zip Type" />
                  <Field name="opening_type" type="text" component={DataRow} label="Opening Type" />
                </div>
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
            <Supplier {...{ suppliers, newSupplier, selectedType }} className="mb2" />
            {['Fabric'].includes(selectedType) &&
              <CareLabels {...{ labels, addCareLabel, removeCareLabel }} />
            }
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
  addCareLabel: PropTypes.func,
  removeCareLabel: PropTypes.func,
  types: PropTypes.object,
  colors: PropTypes.object,
  currencies: PropTypes.object,
  suppliers: PropTypes.object,
  labels: PropTypes.object,
  initialValues: PropTypes.object,
};

export default reduxForm({
  form: 'Material',
})(Form);
