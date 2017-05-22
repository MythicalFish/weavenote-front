import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Header from 'components/Header';
import {
  selectMaterial, selectMaterialTypes, selectColors, selectCurrencies,
  selectMaterialForm,
} from './selectors';
import {
  fetchMaterial, updateMaterial, createMaterial,
  fetchMaterialTypes, fetchColors, fetchCurrencies,
} from './actions';
import Form from './partials/Form';
import Toolbar from './partials/Toolbar';

export class MaterialManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { params, materialTypes, colors, currencies } = this.props;
    if (!materialTypes) { this.props.fetchMaterialTypes(); }
    if (!colors) { this.props.fetchColors(); }
    if (!currencies) { this.props.fetchCurrencies(); }
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
    const { material, materialTypes, colors, currencies } = this.props;
    return (
      <div>
        <Header />
        <Toolbar />
        <div className="p2">
          <div className="container">
            {material && materialTypes && colors && currencies &&
              <Form
                initialValues={this.props.materialForm}
                materialTypes={materialTypes}
                colors={colors}
                currencies={currencies}
                onSubmit={(values) => { this.onSubmit(values); }}
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
  material: PropTypes.object,
  fetchMaterialTypes: PropTypes.func.isRequired,
  materialTypes: PropTypes.array,
  fetchColors: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  colors: PropTypes.array,
  currencies: PropTypes.array,
};

const mapState = createStructuredSelector({
  material: selectMaterial(),
  materialForm: selectMaterialForm(),
  materialTypes: selectMaterialTypes(),
  colors: selectColors(),
  currencies: selectCurrencies(),
});

function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchMaterial, fetchMaterialTypes, updateMaterial, createMaterial, fetchColors, fetchCurrencies,
    },
    dispatch
  );
}

export default connect(mapState, mapDispatch)(MaterialManager);
