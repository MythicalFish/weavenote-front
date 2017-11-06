import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import Button from 'components/Button';
import { VIEW } from './constants';
import List from './subcomponents/List';
import MaterialCost from './subcomponents/MaterialCost';
import AddMaterial from './subcomponents/AddMaterial';

import { fetchMaterials } from '../MaterialList/actions';
import { selectMaterials } from '../MaterialList/selectors';
import {
  fetchComponents,
  createComponents,
  updateComponent,
  deleteComponent,
  selectMaterial,
} from './actions';
import { createMaterial } from '../MaterialManager/actions';
import * as selectors from './selectors';
import { selectMaterialCost } from '../ProjectManager/selectors';

class Components extends React.Component {
  state = { view: VIEW.list, materialID: null };
  componentDidMount() {
    this.props.fetchComponents();
    this.props.fetchMaterials();
  }
  setView = (view) => this.setState({ view });
  materialListHeight = () => this.props.materials.size * 50 + 100;
  editMaterial = (material) => {
    this.setState({ materialID: material.get('id'), view: VIEW.edit });
  };

  render() {
    const { materialID, view } = this.state;
    const { setView, materialListHeight, editMaterial } = this;
    const mProps = {
      ...this.props,
      materialID,
      view,
      setView,
      materialListHeight,
      editMaterial,
    };
    const abilities = this.props.abilities.get('Material').toJS();
    return (
      <div>
        {abilities.create && (
          <Button
            onClick={() => this.props.openModal('materials')}
            label="Add material"
            small
          />
        )}
        <div className="mt3">
          <List {...{ ...mProps, abilities }} />
        </div>
        <MaterialCost {...mProps} />
        <AddMaterial {...mProps} />
      </div>
    );
  }
}

Components.propTypes = {
  fetchComponents: PropTypes.func,
  openModal: PropTypes.func,
  fetchMaterials: PropTypes.func,
  materials: PropTypes.object,
  abilities: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      updateComponent,
      deleteComponent,
      fetchComponents,
      createComponents,
      fetchMaterials,
      selectMaterial,
      createMaterial,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  components: selectors.selectComponents(),
  selectedMaterials: selectors.selectSelectedMaterials(),
  materials: selectMaterials(),
  materialCost: selectMaterialCost(),
});

export default connect(mapState, mapDispatch)(Components);
