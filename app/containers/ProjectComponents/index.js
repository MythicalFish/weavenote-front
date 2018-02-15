import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import Button from 'components/Button';
import List from './subcomponents/List';
import MaterialCost from './subcomponents/MaterialCost';
import AddMaterial from './subcomponents/AddMaterial';
import { VIEW } from './constants';
import { fetchMaterials, filterMaterials } from '../MaterialList/actions';
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
  changeView = (view) => {
    this.setState({ view, materialID: null });
  };
  editMaterial = (material) => {
    this.setState({ materialID: material.get('id'), view: VIEW.edit });
  };
  listMaterials = () => {
    this.props.openModal('materials');
    this.changeView(VIEW.list);
  };
  render() {
    const { changeView, editMaterial } = this;
    const { view, materialID } = this.state;
    const abilities = this.props.abilities.toJS();
    const mProps = {
      ...this.props,
      changeView,
      editMaterial,
      view,
      materialID,
    };
    return (
      <div>
        {abilities.Component.create && (
          <Button onClick={this.listMaterials} label="Add material" small />
        )}
        <div className="mt3">
          <List {...{ ...mProps, abilities: abilities.Component }} />
        </div>
        <MaterialCost {...mProps} />
        <AddMaterial {...{ ...mProps, abilities: abilities.Material }} />
      </div>
    );
  }
}

Components.propTypes = {
  fetchComponents: PropTypes.func,
  openModal: PropTypes.func,
  fetchMaterials: PropTypes.func,
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
      filterMaterials,
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
