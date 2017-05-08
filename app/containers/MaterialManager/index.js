import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectMaterial, selectMaterialTypes } from './selectors';
import { fetchMaterial, updateMaterial, fetchMaterialTypes } from './actions';
import Form from './partials/Form';
import Toolbar from './partials/Toolbar';

export class MaterialManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { params, materialTypes } = this.props;
    this.props.fetchMaterial(params.id);
    if (!materialTypes) {
      this.props.fetchMaterialTypes();
    }
  }

  render() {
    const { material, materialTypes, updateMaterial: update } = this.props;
    return (
      <div>
        <Toolbar />
        <div className="p2">
          <div className="container-narrow">
            {material && materialTypes &&
              <Form
                initialValues={material}
                materialTypes={materialTypes}
                onSubmit={(values) => { update(values); }}
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
  params: PropTypes.object.isRequired,
  material: PropTypes.object,
  fetchMaterialTypes: PropTypes.func.isRequired,
  materialTypes: PropTypes.array,
};

const mapState = createStructuredSelector({
  material: selectMaterial(),
  materialTypes: selectMaterialTypes(),
});

function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchMaterial, fetchMaterialTypes, updateMaterial },
    dispatch
  );
}

export default connect(mapState, mapDispatch)(MaterialManager);
