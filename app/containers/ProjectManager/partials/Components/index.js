import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectMaterials } from 'containers/App/selectors';
import { fetchMaterials } from 'containers/MaterialList/actions';
import SelectMaterial from './SelectMaterial';
import ListComponents from './ListComponents';
import { fetchComponents, switchComponent, createComponent } from '../../actions';
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

  create = (materialID) => {
    this.props.createComponent({
      materialID,
      projectID: this.props.project.id,
    });
  }

  render() {
    const { toggleCreate, create, state } = this;
    const props = {
      ...this.props,
      toggleCreate,
      create,
    };
    return (
      <div>
        {
          state.creating
            ? <SelectMaterial {...props} />
            : <ListComponents {...props} />
        }
      </div>
    );
  }
}

Components.propTypes = {
  project: PropTypes.object,
  fetchComponents: PropTypes.func,
  createComponent: PropTypes.func,
  fetchMaterials: PropTypes.func,
  switchComponent: PropTypes.func,
};


export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchComponents, createComponent, switchComponent, fetchMaterials },
    dispatch
  );
}

const mapState = createStructuredSelector({
  components: selectComponents(),
  materials: selectMaterials(),
  current: selectCurrentComponent(),
  initialValues: selectComponentForm(),
});

export default connect(mapState, mapDispatch)(Components);
