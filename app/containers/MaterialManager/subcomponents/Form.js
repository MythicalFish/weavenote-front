/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectMaterial } from '../selectors';
import {
  fetchMaterial,
  updateMaterial,
  createMaterial,
  newSupplier,
  addCareLabel,
  removeCareLabel,
} from '../actions';
import FormLayout from './FormLayout';

export class MaterialManager extends React.PureComponent {
  componentWillMount() {
    const { params, id } = this.props;
    this.props.fetchMaterial(id || params.id);
  }

  onSubmit = () => {
    const { params, id } = this.props;
    if ((id || params.id) === 'new') {
      this.props.createMaterial();
    } else {
      this.props.updateMaterial();
    }
  };

  render() {
    const { abilities, material, globalData } = this.props;
    if (!globalData) return null;
    const { onSubmit } = this;
    const fProps = {
      initialValues: material,
      abilities: abilities.get('Material'),
      onSubmit,
      addLabel: this.props.addCareLabel,
      removeLabel: this.props.removeCareLabel,
      isNew: this.props.params.id === 'new',
      ...globalData,
    };
    if (material && globalData.colors) return <FormLayout {...fProps} />;
    return null;
  }
}

const mapState = createStructuredSelector({
  material: selectMaterial(),
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
