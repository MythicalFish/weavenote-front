import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectMaterials from './selectors';
import { fetchMaterial } from './actions';

export class MaterialManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { params, fetch } = this.props;
    fetch(params.id);
  }

  render() {
    return (
      <div>
        {}
      </div>
    );
  }
}

MaterialManager.propTypes = {
  fetch: PropTypes.func.isRequired,
  params: PropTypes.object,
};

const mapState = createStructuredSelector({
  Materials: makeSelectMaterials(),
});

function mapDispatch(dispatch) {
  return {
    fetch: (id) => { dispatch(fetchMaterial(id)); },
  };
}

export default connect(mapState, mapDispatch)(MaterialManager);
