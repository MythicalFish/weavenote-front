import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { fetchMaterials } from 'containers/MaterialList/actions';
import { selectMaterials } from 'containers/App/selectors';
import Accordion from 'components/Accordion';
import Price from 'components/Price';
import SelectMaterial from './SelectMaterial';
import ListItem from './ListItem';
import Form from './Form';
import {
  fetchComponents,
  switchComponent,
  updateComponent,
  createComponent,
} from './actions';
import {
  selectComponents,
  selectCurrentComponent,
  selectComponentForm,
} from './selectors';
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
      fetchComponents,
      updateComponent,
      createComponent,
      switchComponent,
      fetchMaterials,
    },
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
