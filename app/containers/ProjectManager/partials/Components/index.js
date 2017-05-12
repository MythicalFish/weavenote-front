import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectMaterials } from 'containers/App/selectors';
import { fetchMaterials } from 'containers/MaterialList/actions';
import SelectMaterial from './SelectMaterial';
import ListComponents from './ListComponents';
import {
  fetchComponents, switchComponent, updateComponent, createComponent,
  fetchMaterialCost,
} from '../../actions';
import { selectComponents, selectCurrentComponent, selectComponentForm } from '../../selectors';

class Components extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      creating: false,
    };
  }

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
            : <ListComponents
              project={this.props.project}
              components={this.props.components}
              current={this.props.current}
              toggleCreate={this.toggleCreate}
              updateComponent={this.props.updateComponent}
              fetchMaterialCost={this.props.fetchMaterialCost}
              switchComponent={this.props.switchComponent}
              formValues={this.props.formValues}
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
});

export default connect(mapState, mapDispatch)(Components);
