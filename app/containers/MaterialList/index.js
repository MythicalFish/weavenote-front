import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Header from 'components/Header';
import { fetchMaterials, deleteMaterial } from './actions';
import Toolbar from './subcomponents/Toolbar';
import ListItem from './subcomponents/ListItem';
import { selectMaterials } from './selectors';

export class MaterialList extends React.PureComponent {
  state = { view: 'Materials' };
  componentDidMount() {
    this.props.fetchMaterials();
  }
  changeView = (view) => {
    this.setState({ view });
  };
  render() {
    const { materials } = this.props;
    return (
      <div>
        <Header />
        <Toolbar
          changeView={this.changeView}
          currentView={this.state.view}
          fetch={this.props.fetchMaterials}
        />
        <div className="container-narrow px2 py4">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Ref.</th>
                <th>Name</th>
                <th>Color</th>
                <th>Factory</th>
                <th>Price</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {materials &&
                materials
                  .toArray()
                  .map((material) => (
                    <ListItem
                      material={material}
                      key={`material-${material.get('id')}`}
                      deleteMaterial={this.props.deleteMaterial}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

MaterialList.propTypes = {
  fetchMaterials: PropTypes.func.isRequired,
  deleteMaterial: PropTypes.func,
  materials: PropTypes.object,
};

const mapState = createStructuredSelector({
  materials: selectMaterials(),
});

function mapDispatch(dispatch) {
  return bindActionCreators({ fetchMaterials, deleteMaterial }, dispatch);
}

export default connect(mapState, mapDispatch)(MaterialList);
