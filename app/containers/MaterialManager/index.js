import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectMaterial } from './selectors';
import { fetchMaterial } from './actions';
import Form from './partials/Form';

export class MaterialManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { params, fetchMaterial: fetch } = this.props;
    fetch(params.id);
  }

  render() {
    const { material } = this.props;
    return (
      <div>
        <Form
          onSubmit={(data) => { console.log(data); }}
          initialValues={material}
        />
      </div>
    );
  }
}

MaterialManager.propTypes = {
  fetchMaterial: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  material: PropTypes.object,
};

const mapState = createStructuredSelector({
  material: selectMaterial(),
});

function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchMaterial },
    dispatch
  );
}

export default connect(mapState, mapDispatch)(MaterialManager);
