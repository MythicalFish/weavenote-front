import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SubHeader from 'components/SubHeader';
import selectMaterialsList from './selectors';
import { fetchMaterials } from './actions';

export class MaterialList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { materials } = this.props;
    console.log(materials);
    if (!materials) { return null; }
    return (
      <div>
        <SubHeader>
        </SubHeader>
        {materials && materials.map((material) => (
          <div>
            {material.name}
          </div>
        ))}
      </div>
    );
  }
}

MaterialList.propTypes = {
  fetch: PropTypes.func.isRequired,
  materials: PropTypes.object,
};

const mapState = createStructuredSelector({
  materials: selectMaterialsList(),
});

function mapDispatch(dispatch) {
  return {
    fetch: () => { dispatch(fetchMaterials()); },
  };
}

export default connect(mapState, mapDispatch)(MaterialList);
