import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectMaterials } from 'containers/App/selectors';
import { fetchMaterials } from 'containers/MaterialList/actions';
import Accordion from 'components/Accordion';
import Price from 'components/Price';
import SelectMaterial from './SelectMaterial';
import ListItem from './ListItem';
import Form from './Form';
import {
  fetchComponents, switchComponent, updateComponent, createComponent,
  fetchMaterialCost,
} from '../../actions';
import { selectComponents, selectCurrentComponent, selectComponentForm, selectMaterialCost } from '../../selectors';

class Components extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = { creating: false }

  componentDidMount() {
    const { project } = this.props;
    this.props.fetchComponents(project.id);
    this.props.fetchMaterials();
  }

  toggleCreate = () => {
    this.setState({ creating: !this.state.creating });
  }

  render() {
    return (
      <div>
        {
          this.state.creating
            ? <SelectMaterial
              project={this.props.project}
              materials={this.props.materials}
              toggleCreate={this.toggleCreate}
              createComponent={this.props.createComponent}
            />
            : <Accordion
              items={this.props.components}
              current={this.props.current}
              toggleCreate={this.toggleCreate}
              updateItem={this.props.updateComponent}
              switchItem={this.props.switchComponent}
              formValues={this.props.formValues}
              ListItem={ListItem}
              Form={Form}
              footer={{
                label: 'Material cost',
                value: <Price value={this.props.materialCost} />,
              }}
            />
        }
      </div>
    );
  }
}

Components.propTypes = {
  project: PropTypes.object,
  materials: PropTypes.object,
  components: PropTypes.object,
  current: PropTypes.object,
  fetchComponents: PropTypes.func,
  createComponent: PropTypes.func,
  updateComponent: PropTypes.func,
  fetchMaterials: PropTypes.func,
  fetchMaterialCost: PropTypes.func,
  switchComponent: PropTypes.func,
  formValues: PropTypes.object,
  materialCost: PropTypes.number,
};


export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchComponents, updateComponent, createComponent, switchComponent, fetchMaterials, fetchMaterialCost },
    dispatch
  );
}

const mapState = createStructuredSelector({
  components: selectComponents(),
  materials: selectMaterials(),
  current: selectCurrentComponent(),
  formValues: selectComponentForm(),
  materialCost: selectMaterialCost(),
});

export default connect(mapState, mapDispatch)(Components);
