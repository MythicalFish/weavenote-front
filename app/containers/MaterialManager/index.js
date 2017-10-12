/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  selectAbilities,
  selectGlobalData,
  selectUser,
} from 'containers/App/selectors';
import Layout from 'components/Layout';
import { selectMaterial } from './selectors';
import {
  fetchMaterial,
  updateMaterial,
  createMaterial,
  newSupplier,
  addCareLabel,
  removeCareLabel,
} from './actions';
import Form from './subcomponents/Form';

export class MaterialManager extends React.PureComponent {
  componentDidMount() {
    const { params } = this.props;
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
    const { abilities, material, globalData } = this.props;
    if (!globalData) return null;
    const { onSubmit } = this;
    const fProps = {
      initialValues: material,
      abilities: abilities.Material,
      onSubmit,
      addLabel: this.props.addCareLabel,
      removeLabel: this.props.removeCareLabel,
      isNew: this.props.params.id === 'new',
      ...globalData,
    };
    return (
      <Layout {...this.props} type="narrow2" scrollable>
        {material && globalData.colors && <Form {...fProps} />}
      </Layout>
    );
  }
}

const mapState = createStructuredSelector({
  material: selectMaterial(),
  globalData: selectGlobalData(),
  abilities: selectAbilities(),
  user: selectUser(),
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
    },
    dispatch
  );

export default connect(mapState, mapDispatch)(MaterialManager);
