import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'containers/App/selectors';
import { fetchMaterials, deleteMaterial, duplicateMaterial } from '../actions';
import { selectMaterials } from '../selectors';
import Toolbar from './Toolbar';
import ListItem from './ListItem';

class List extends React.PureComponent {
  state = { view: 'Materials' };
  componentWillMount() {
    this.props.fetchMaterials();
  }
  changeView = (view) => {
    this.setState({ view });
  };
  render() {
    const { materials, showToolbar, selectable } = this.props;
    return (
      <div>
        {showToolbar && (
          <Toolbar
            changeView={this.changeView}
            currentView={this.state.view}
            fetch={this.props.fetchMaterials}
          />
        )}
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
  showToolbar: PropTypes.bool,
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
