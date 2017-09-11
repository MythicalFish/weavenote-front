import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import PlusButton from 'components/PlusButton';
import Accordion from 'components/Accordion';
import SelectMaterial from './subcomponents/SelectMaterial';
import RowHeader from './subcomponents/ListItem';
import Form from './subcomponents/Form';
import MaterialCost from './subcomponents/MaterialCost';

import { fetchMaterials } from '../MaterialList/actions';
import { selectMaterials } from '../MaterialList/selectors';
import { fetchComponents, createComponent, updateComponent } from './actions';
import * as selectors from './selectors';
import { selectMaterialCost } from '../ProjectManager/selectors';

class Components extends React.Component {
  state = { creating: false };

  componentDidMount() {
    const { project } = this.props;
    this.props.fetchComponents(project.get('id'));
    this.props.fetchMaterials();
  }

  toggleCreate = () => {
    this.setState({ creating: !this.state.creating });
  };

  render() {
    const { toggleCreate } = this;
    const { updateComponent: updateItem } = this.props;
    return (
      <div>
        {this.state.creating ? (
          <SelectMaterial {...{ ...this.props, toggleCreate }} />
        ) : (
          <div>
            <PlusButton onClick={toggleCreate} />
            <Accordion
              {...{ ...this.props, RowHeader, Form, updateItem }}
              footer={<MaterialCost {...this.props} />}
            />
          </div>
        )}
      </div>
    );
  }
}

Components.propTypes = {
  project: PropTypes.object,
  fetchComponents: PropTypes.func,
  updateComponent: PropTypes.func,
  fetchMaterials: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      updateComponent,
      fetchComponents,
      createComponent,
      fetchMaterials,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  items: selectors.selectComponents(),
  materials: selectMaterials(),
  materialCost: selectMaterialCost(),
});

export default connect(mapState, mapDispatch)(Components);
