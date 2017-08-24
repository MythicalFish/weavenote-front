import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import Accordion from 'components/Accordion';
import SelectMaterial from './subcomponents/SelectMaterial';
import ListItem from './subcomponents/ListItem';
import Form from './subcomponents/Form';
import MaterialCost from './subcomponents/MaterialCost';

import { fetchMaterials } from '../MaterialList/actions';
import { selectMaterials } from '../MaterialList/selectors';
import * as actions from './actions';
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
    return (
      <div>
        {this.state.creating
          ? <SelectMaterial {...this.props} {...{ toggleCreate }} />
          : <Accordion
            items={this.props.components}
            toggleCreate={this.toggleCreate}
            updateItem={this.props.updateComponent}
            switchItem={this.props.switchComponent}
            formValues={this.props.formValues}
            ListItem={ListItem}
            Form={Form}
            footer={<MaterialCost cost={this.props.materialCost} />}
          />}
      </div>
    );
  }
}

Components.propTypes = {
  project: PropTypes.object,
  components: PropTypes.object,
  current: PropTypes.object,
  fetchComponents: PropTypes.func,
  updateComponent: PropTypes.func,
  fetchMaterials: PropTypes.func,
  switchComponent: PropTypes.func,
  formValues: PropTypes.object,
  materialCost: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      ...actions,
      fetchMaterials,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  components: selectors.selectComponents(),
  materials: selectMaterials(),
  materialCost: selectMaterialCost(),
});

export default connect(mapState, mapDispatch)(Components);
