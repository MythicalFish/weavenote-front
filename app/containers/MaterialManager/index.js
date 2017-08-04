/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Header from 'components/Header';
import { selectAbilities } from 'containers/App/selectors';
import {
  selectMaterial,
  selectMaterialTypes,
  selectColors,
  selectCurrencies,
  selectSuppliers,
  selectCareLabels,
} from './selectors';
import {
  fetchMaterial,
  updateMaterial,
  createMaterial,
  fetchMaterialAssociations,
  newSupplier,
  addCareLabel,
  removeCareLabel,
} from './actions';
import Form from './subcomponents/Form';
import Toolbar from './subcomponents/Toolbar';

export class MaterialManager extends React.PureComponent {
  componentDidMount() {
    const { params } = this.props;
    this.props.fetchMaterialAssociations();
    this.props.fetchMaterial(params.id);
  }

  onSubmit = (values) => {
    const { params } = this.props;
    if (params.id === 'new') {
      this.props.createMaterial(values);
    } else {
      this.props.updateMaterial(values);
    }
  };

  render() {
    const { initialValues } = this.props;

    const { onSubmit } = this;
    return (
      <div>
        <Header />
        <Toolbar />
        <div className="p4">
          <div className="container-narrower">
            {initialValues && <Form {...{ onSubmit, ...this.props }} />}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = createStructuredSelector({
  initialValues: selectMaterial(),
  types: selectMaterialTypes(),
  colors: selectColors(),
  currencies: selectCurrencies(),
  suppliers: selectSuppliers(),
  labels: selectCareLabels(),
  abilities: selectAbilities(),
});

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      fetchMaterial,
      updateMaterial,
      createMaterial,
      newSupplier,
      addCareLabel,
      removeCareLabel,
      fetchMaterialAssociations,
    },
    dispatch
  );

export default connect(mapState, mapDispatch)(MaterialManager);
