import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectMaterial, selectMaterialTypes, selectColors } from './selectors';
import { fetchMaterial, updateMaterial, createMaterial, fetchMaterialTypes, fetchColors } from './actions';
import Form from './partials/Form';
import Toolbar from './partials/Toolbar';

export class MaterialManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { params, materialTypes, colors } = this.props;
    if (!materialTypes) { this.props.fetchMaterialTypes(); }
    if (!colors) { this.props.fetchColors(); }
    this.props.fetchMaterial(params.id);
  }

  onSubmit = (values) => {
    const { params, updateMaterial: update, createMaterial: create } = this.props;
    if (params.id === 'new') {
      create(values);
    } else {
      update(values);
    }
  }

  render() {
    const { material, materialTypes, colors } = this.props;
    return (
      <div>
        <Toolbar />
        <div className="p2">
          <div className="container-narrower">
            {material && materialTypes && colors &&
              <Form
                initialValues={material}
                materialTypes={materialTypes}
                colors={colors}
                onSubmit={(values) => { this.onSubmit(values); }}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

MaterialManager.propTypes = {
  fetchMaterial: PropTypes.func.isRequired,
  updateMaterial: PropTypes.func.isRequired,
  createMaterial: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  material: PropTypes.object,
  fetchMaterialTypes: PropTypes.func.isRequired,
  materialTypes: PropTypes.array,
  fetchColors: PropTypes.func.isRequired,
  colors: PropTypes.array,
};

const mapState = createStructuredSelector({
  material: selectMaterial(),
  materialTypes: selectMaterialTypes(),
  colors: selectColors(),
});

function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchMaterial, fetchMaterialTypes, updateMaterial, createMaterial, fetchColors },
    dispatch
  );
}

export default connect(mapState, mapDispatch)(MaterialManager);
