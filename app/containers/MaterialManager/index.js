import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Header from 'components/Header';
import { selectOrganizationRole } from 'containers/App/selectors';
import {
  selectMaterial, selectMaterialTypes, selectColors, selectCurrencies, selectSuppliers, selectCareLabels,
} from './selectors';
import {
  fetchMaterial, updateMaterial, createMaterial,
  fetchMaterialAssociations, newSupplier, addCareLabel, removeCareLabel,
} from './actions';
import Form from './partials/Form';
import Toolbar from './partials/Toolbar';

export class MaterialManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { params, types, colors, currencies, suppliers, labels } = this.props;
    this.props.fetchMaterialAssociations();
    this.props.fetchMaterial(params.id);
  }

  onSubmit = (values) => {
    const { params, updateMaterial: update, createMaterial: create } = this.props;
    if (params.id === 'new') {
      create(values);
    } else {
      update(values);
    }
  }

  render() {
    const {
      initialValues, types, colors, currencies, suppliers,
      newSupplier: n, labels, addCareLabel: a, removeCareLabel: r,
      userRole,
    } = this.props;

    const { onSubmit } = this;
    return (
      <div>
        <Header />
        <Toolbar />
        <div className="p2">
          <div className="container">
            {initialValues && types && colors && currencies && suppliers && labels &&
              <Form {...{
                initialValues, types, colors, currencies, suppliers, labels,
                newSupplier: n, onSubmit, addCareLabel: a, removeCareLabel: r, userRole }} />
            }
          </div>
        </div>
      </div>
    );
  }
}

MaterialManager.propTypes = {
  fetchMaterial: PropTypes.func.isRequired,
  updateMaterial: PropTypes.func.isRequired,
  createMaterial: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  types: PropTypes.object,
  newSupplier: PropTypes.func.isRequired,
  fetchMaterialAssociations: PropTypes.func,
  colors: PropTypes.object,
  suppliers: PropTypes.object,
  currencies: PropTypes.object,
  labels: PropTypes.object,
  userRole: PropTypes.object,
};

const mapState = createStructuredSelector({
  initialValues: selectMaterial(),
  types: selectMaterialTypes(),
  colors: selectColors(),
  currencies: selectCurrencies(),
  suppliers: selectSuppliers(),
  labels: selectCareLabels(),
  userRole: selectOrganizationRole(),
});

const mapDispatch = (dispatch) => (bindActionCreators({
  fetchMaterial,
  updateMaterial,
  createMaterial,
  newSupplier,
  addCareLabel,
  removeCareLabel,
  fetchMaterialAssociations,
}, dispatch));

export default connect(mapState, mapDispatch)(MaterialManager);
