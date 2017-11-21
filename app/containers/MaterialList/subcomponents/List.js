import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'containers/App/selectors';
import { fetchMaterials, deleteMaterial, duplicateMaterial } from '../actions';
import { selectMaterials } from '../selectors';
import ListItem from './ListItem';

class List extends React.PureComponent {
  componentWillMount() {
    this.props.fetchMaterials();
  }
  render() {
    const { materials, selectable } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              {selectable && <th />}
              <th>Type</th>
              <th>Ref.</th>
              <th>Name</th>
              <th>Colour</th>
              <th>Supplier</th>
              <th>Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <ListItem
                key={`material-${material.get('id')}`}
                material={material}
                {...this.props}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

List.propTypes = {
  fetchMaterials: PropTypes.func,
  materials: PropTypes.object,
  selectable: PropTypes.bool,
};

const mapState = createStructuredSelector({
  materials: selectMaterials(),
  user: selectUser(),
});

function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchMaterials, deleteMaterial, duplicateMaterial },
    dispatch
  );
}

export default connect(mapState, mapDispatch)(List);
