import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import Button from 'components/Button';
import Accordion from 'components/Accordion';
import RowHeader from './subcomponents/ListItem';
import Form from './subcomponents/Form';
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
  componentDidMount() {
    const { project } = this.props;
    this.props.fetchComponents(project.get('id'));
    this.props.fetchMaterials();
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => this.props.openModal('materials')}
          label="Add material"
          small
        />
        <Accordion
          {...{ ...this.props, RowHeader, Form }}
          footer={<MaterialCost {...this.props} />}
        />
        <AddMaterial {...this.props} />
      </div>
    );
  }
}

Components.propTypes = {
  project: PropTypes.object,
  fetchComponents: PropTypes.func,
  openModal: PropTypes.func,
  fetchMaterials: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      updateItem: updateComponent,
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
  items: selectors.selectComponents(),
  selectedMaterials: selectors.selectSelectedMaterials(),
  materials: selectMaterials(),
  materialCost: selectMaterialCost(),
});

export default connect(mapState, mapDispatch)(Components);
