import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Header from 'components/Header';
import {
  selectMaterial, selectMaterialTypes, selectColors, selectCurrencies, selectSuppliers, selectCareLabels,
} from './selectors';
import {
  fetchMaterial, updateMaterial, createMaterial,
  fetchMaterialTypes, fetchColors, fetchCurrencies, fetchSuppliers, newSupplier, fetchCareLabels,
} from './actions';
import Form from './partials/Form';
import Toolbar from './partials/Toolbar';

export class MaterialManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { params, materialTypes, colors, currencies, suppliers, careLabels } = this.props;
    if (!materialTypes) { this.props.fetchMaterialTypes(); }
    if (!colors) { this.props.fetchColors(); }
    if (!currencies) { this.props.fetchCurrencies(); }
    if (!suppliers) { this.props.fetchSuppliers(); }
    if (!careLabels) { this.props.fetchCareLabels(); }
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
      newSupplier: n, careLabels,
    } = this.props;
    return (
      <div>
        <Header />
        <Toolbar />
        <div className="p2">
          <div className="container">
            {initialValues && types && colors && currencies && suppliers &&
              <Form
                {...{
                  initialValues,
                  types,
                  colors,
                  currencies,
                  suppliers,
                  careLabels,
                  newSupplier: n,
                  onSubmit: (values) => { this.onSubmit(values); },
                }}
              />
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
  fetchMaterialTypes: PropTypes.func.isRequired,
  fetchCareLabels: PropTypes.func.isRequired,
  types: PropTypes.array,
  fetchColors: PropTypes.func.isRequired,
  fetchSuppliers: PropTypes.func.isRequired,
  newSupplier: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  colors: PropTypes.array,
  suppliers: PropTypes.object,
  currencies: PropTypes.array,
  careLabels: PropTypes.object,
};

const mapState = createStructuredSelector({
  initialValues: selectMaterial(),
  types: selectMaterialTypes(),
  colors: selectColors(),
  currencies: selectCurrencies(),
  suppliers: selectSuppliers(),
  careLabels: selectCareLabels(),
});

const mapDispatch = (dispatch) => (bindActionCreators({
  fetchMaterial,
  fetchMaterialTypes,
  updateMaterial,
  createMaterial,
  fetchColors,
  fetchCurrencies,
  fetchSuppliers,
  newSupplier,
  fetchCareLabels,
}, dispatch));

export default connect(mapState, mapDispatch)(MaterialManager);
